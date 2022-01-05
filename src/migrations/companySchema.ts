import { compact } from "lodash";
import { Db } from "mongodb"
import winston from "winston"
import { N_ColourPaletteType } from "../models/mongodb-realm/common/ColourPalette";
import { N_FileType } from "../models/mongodb-realm/common/File";
import { N_MagnetType } from "../models/mongodb-realm/common/Magnet";
import { N_ParticipantType } from "../models/mongodb-realm/common/Participant";
import { N_SettingsMetadataType } from "../models/mongodb-realm/common/SettingsMetadata";
import { N_CompanyType } from "../models/mongodb-realm/company/Company";
import { N_DivisionType } from "../models/mongodb-realm/company/Division";
import { N_LocationType } from "../models/mongodb-realm/company/Location";
import { N_WorkshopTemplateType } from "../models/mongodb-realm/company/WorkshopTemplate";
import { FileType } from "../models/ros/common/File";
import { CompanyType } from "../models/ros/company/Company";
import { DivisionType } from "../models/ros/company/Division";
import { WorkshopTemplateType } from "../models/ros/company/WorkshopTemplate";
import { asyncForEach, omit, readRealm } from "../utils";
var ObjectID = require("bson-objectid");

const MigrateCompanySchemas = (companyId: any, newCompanyId: any, user: any, realm: Realm, db: Db, logger: winston.Logger, idDb: Db) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.info(
                `Migrating company ${companyId} for user ${user.id}.`
            );
            const companyObject: any = await readRealm<CompanyType>(
                realm,
                "Company"
            );

            if (companyObject && companyObject.length > 0) {
                const company: N_CompanyType = companyObject[0] as N_CompanyType;
                company._id = newCompanyId,
                    company._partition = company.companyUrl = `companyRealm=${newCompanyId}`

                const companyCollection = db.collection("Company");
                
                // Step1:
                //Combine all the files and upload to Files.
                let allFiles: FileType[] = [company.logoFile, ...company.logos, company.bannerImage, company.croppedLogo]
                company.workshopTemplates.forEach((w: WorkshopTemplateType) => {
                    allFiles.push(...w.files);
                })
                allFiles = compact(allFiles)
                const fileMapper: any = {};
                const newFiles: N_FileType[] = allFiles.map((f: FileType) => {
                    let _id = new ObjectID();
                    fileMapper[f.fileId] = _id;
                    f = omit(["fileId"], f);
                    return { ...f, _id, _partition: `companyRealm=${newCompanyId}` }
                })
                const FilesCollection = db.collection("File");
                if (allFiles.length > 0) {
                    await FilesCollection.insertMany(newFiles);
                }
                if (company.logoFile) {
                    company.logoFile = fileMapper[company.logoFile.fileId]
                }
                if (company.bannerImage) {
                    company.bannerImage = fileMapper[company.bannerImage.fileId]
                }
                if (company.croppedLogo) {
                    company.croppedLogo = fileMapper[company.croppedLogo.fileId]
                }
                company.logos = company.logos.map((x) => fileMapper[x.fileId])

                //Step 2: Participants.
                const participants: any = [];
                const participantCollection = db.collection("Participant");
                await asyncForEach(company.participants, async (participant) => {
                    let newParticipant: N_ParticipantType = {
                        ...participant,
                        _id: new ObjectID(),
                        _partition: `companyRealm=${newCompanyId}`
                    }
                    newParticipant = omit(["id"], newParticipant);
                    await participantCollection.insertOne(newParticipant);
                    participants.push(newParticipant._id);
                })

                company.participants = participants;

                //Step 2: Colors.
                const colours: any = [];
                const coloursCollection = db.collection("ColourPalette");
                await asyncForEach(company.colours, async (color) => {
                    let newColor: N_ColourPaletteType = {
                        ...color,
                        _id: new ObjectID(),
                        _partition: `companyRealm=${newCompanyId}`
                    }
                    newColor = omit(["id"], newColor);
                    await coloursCollection.insertOne(newColor);
                    colours.push(newColor._id);
                })
                company.colours = colours;

                //Step 3: zoneHeaderColour
                if (company.zoneHeaderColour) {
                    let newColor: N_ColourPaletteType = {
                        ...company.zoneHeaderColour,
                        _id: new ObjectID(),
                        _partition: `companyRealm=${newCompanyId}`
                    }
                    newColor = omit(["id"], newColor);
                    await coloursCollection.insertOne(newColor);
                    company.zoneHeaderColour = newColor._id;
                }

                //Step 4: Divisions
                await asyncForEach(company.divisions, async (division: DivisionType, index: number) => {
                    let newDivision: N_DivisionType = { ...division, _id: "" }
                    newDivision = omit(["employees", "divisionId"], newDivision);
                    newDivision._id = new ObjectID();
                    //Participants
                    const participants: any = [];
                    const participantCollection = db.collection("Participant");
                    await asyncForEach(newDivision.participants, async (participant) => {
                        let newParticipant: N_ParticipantType = {
                            ...participant,
                            _id: new ObjectID(),
                            _partition: `companyRealm=${newCompanyId}`
                        }
                        newParticipant = omit(["id"], newParticipant);
                        await participantCollection.insertOne(newParticipant);
                        participants.push(newParticipant._id);
                    })
                    newDivision.participants = participants;
                    //Locations
                    newDivision.locations = newDivision.locations.map((location) => {
                        let newLocation: N_LocationType = {
                            ...location,
                            _id: new ObjectID(),
                        }
                        newLocation = omit(["locationId"], newLocation);
                        return newLocation;
                    })
                    company.divisions[index] = newDivision;
                })

                //Step 5: Magnets.
                const defaultMagnets: any = [];
                const magnetCollection = db.collection("Magnet");
                await asyncForEach(company.defaultMagnets, async (magnet) => {
                    let newMagnet: N_MagnetType = {
                        ...magnet,
                        _id: new ObjectID(),
                        _partition: `companyRealm=${newCompanyId}`
                    }
                    newMagnet = omit(["id"], newMagnet);
                    await magnetCollection.insertOne(newMagnet);
                    defaultMagnets.push(newMagnet._id);
                })
                company.defaultMagnets = defaultMagnets;


                //Step 6: Organization Metadata.
                const metadatas: any = [];
                const metadataCollection = db.collection("SettingsMetadata");
                await asyncForEach(company.organisationMetadata, async (metaData) => {
                    let newMetadata: N_SettingsMetadataType = {
                        ...metaData,
                        _id: new ObjectID(),
                        _partition: `companyRealm=${newCompanyId}`
                    }
                    newMetadata = omit(["settingsMetadataId"], newMetadata);
                    await metadataCollection.insertOne(newMetadata);
                    metadatas.push(newMetadata._id);
                })
                company.organisationMetadata = metadatas;

                //Insert the Company.
                await companyCollection.insertOne(company);
                
            } else {
                logger.error(`Company ${companyId} not found. So, Ignoring.`)
            }
            resolve(true)
        } catch (e) {
            console.log(e);
            reject(e)
        }
    })
}

export default MigrateCompanySchemas;
