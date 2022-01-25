import { compact } from "lodash";
import { Db } from "mongodb";
import winston from "winston";
import { N_ColourPaletteType } from "../models/mongodb-realm/common/ColourPalette";
import { N_FileType } from "../models/mongodb-realm/common/File";
import { N_FormulaType } from "../models/mongodb-realm/common/Formula";
import { N_KPIType } from "../models/mongodb-realm/common/KPI";
import { N_LabelType } from "../models/mongodb-realm/common/Label";
import { N_MagnetType } from "../models/mongodb-realm/common/Magnet";
import { N_ParticipantType } from "../models/mongodb-realm/common/Participant";
import { N_RevenueType } from "../models/mongodb-realm/common/Revenue";
import { N_SettingsMetadataType } from "../models/mongodb-realm/common/SettingsMetadata";
import { N_CompanyType } from "../models/mongodb-realm/company/Company";
import { N_DivisionType } from "../models/mongodb-realm/company/Division";
import { N_LocationType } from "../models/mongodb-realm/company/Location";
import { N_SingleTemplateType } from "../models/mongodb-realm/company/SingleTemplate";
import { N_WorkshopTemplateType } from "../models/mongodb-realm/company/WorkshopTemplate";
import { FileType } from "../models/ros/common/File";
import { CKPIType } from "../models/ros/company/KPI";
import { CompanyType } from "../models/ros/company/Company";
import { DivisionType } from "../models/ros/company/Division";
import { WorkshopTemplateType } from "../models/ros/company/WorkshopTemplate";
import { asyncForEach, omit, readRealm } from "../utils";
var ObjectID = require("bson-objectid");

const MigrateCompanySchemas = (
    companyId: any,
    newCompanyId: any,
    user: any,
    realm: Realm,
    db: Db,
    logger: winston.Logger,
    idDb: Db,
    userIds: any = {}
) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.info(`Migrating company ${companyId} for user ${user.id}.`);
            const companyObject: any = await readRealm<CompanyType>(realm, "Company");

            const templateIDCollection = idDb.collection("templatesMetadata");
            const idCollection = idDb.collection("id");
            const templateIds = await templateIDCollection.find({}).toArray();
            const workshopIDCollection = idDb.collection("workshops");
            const workshopIds = await workshopIDCollection.find({}).toArray();
            const UserCollection = db.collection("User");
            if (companyObject && companyObject.length > 0) {
                const company: N_CompanyType = companyObject[0] as N_CompanyType;
                (company._id = newCompanyId),
                    (company._partition = company.companyUrl =
                        `companyRealm=${newCompanyId}`);

                // Step1:
                //Combine all the files and upload to Files.
                let allFiles: FileType[] = [
                    company.logoFile,
                    ...company.logos,
                    company.bannerImage,
                    company.croppedLogo,
                ];
                company.workshopTemplates.forEach((w: WorkshopTemplateType) => {
                    allFiles.push(...w.files);
                });
                allFiles = compact(allFiles);
                const fileMapper: any = {};
                const newFiles: N_FileType[] = allFiles.map((f: FileType) => {
                    let _id = new ObjectID();
                    fileMapper[f.fileId] = _id;
                    f = omit(["fileId"], f);
                    return { ...f, _id, _partition: `companyRealm=${newCompanyId}` };
                });
                const FilesCollection = db.collection("File");
                if (allFiles.length > 0) {
                    await FilesCollection.insertMany(newFiles);
                }
                if (company.logoFile) {
                    company.logoFile = fileMapper[company.logoFile.fileId];
                }
                if (company.bannerImage) {
                    company.bannerImage = fileMapper[company.bannerImage.fileId];
                }
                if (company.croppedLogo) {
                    company.croppedLogo = fileMapper[company.croppedLogo.fileId];
                }
                company.logos = company.logos.map((x) => fileMapper[x.fileId]);

              

                const RevenueCollection = db.collection("Revenue");
                const KPICollection = db.collection("KPI");
                const kpis: any = [];
                await asyncForEach(company.kpis, async (kpi: any) => {
                    //transform Recurring Revenue
                    if (kpi.recurring) {
                        const _id = new ObjectID();
                        let recurring = kpi.recurring as N_RevenueType;
                        recurring._id = _id;
                        recurring._partition = `companyRealm=${newCompanyId}`;
                        recurring = omit(["id"], recurring);
                        if (recurring.formula) {
                            const _id = new ObjectID();
                            let formula = recurring.formula as N_FormulaType;
                            formula._id = _id;
                            formula = omit(["id"], formula);
                            recurring.formula = formula;
                        }
                        await RevenueCollection.insertOne(recurring);
                        kpi.recurring = _id;
                    }
                    //transform Non Recurring Revenue
                    if (kpi.nonRecurring) {
                        const _id = new ObjectID();
                        let nonRecurring = kpi.nonRecurring as N_RevenueType;
                        nonRecurring._id = _id;
                        nonRecurring._partition = `companyRealm=${newCompanyId}`;
                        nonRecurring = omit(["id"], nonRecurring);
                        if (nonRecurring.formula) {
                            const _id = new ObjectID();
                            let formula = nonRecurring.formula as N_FormulaType;
                            formula._id = _id;
                            formula = omit(["id"], formula);
                            nonRecurring.formula = formula;
                        }
                        await RevenueCollection.insertOne(nonRecurring);
                        kpi.nonRecurring = _id;
                    }
                    kpi._id = new ObjectID();
                    kpi.kpiId = kpi.id;
                    // kpi = omit(["id"], kpi);
                    kpi._partition = `companyRealm=${newCompanyId}`;
                    kpis.push(kpi._id);
                    await KPICollection.insertOne(kpi);
                });

                company.kpis = kpis;

                //Step 2: Participants.
                const participants: any = [];
                const participantCollection = db.collection("Participant");
                await asyncForEach(company.participants, async (participant) => {
                    let newParticipant: N_ParticipantType = {
                        ...participant,
                        _id: new ObjectID(),
                        _partition: `companyRealm=${newCompanyId}`,
                    };
                    if (newParticipant.identity) {
                        newParticipant.identity = newParticipant.identity.replace("_", "|");
                    }
                    await participantCollection.insertOne(newParticipant);
                    participants.push(newParticipant._id);
                });

                company.participants = participants;

                //Step 2: Colors.
                const colours: any = [];
                const coloursCollection = db.collection("ColourPalette");
                await asyncForEach(company.colours, async (color) => {
                    let newColor: N_ColourPaletteType = {
                        ...color,
                        _id: new ObjectID(),
                        _partition: `companyRealm=${newCompanyId}`,
                    };
                    // newColor = omit(["id"], newColor);
                    await coloursCollection.insertOne(newColor);
                    colours.push(newColor._id);
                });
                company.colours = colours;

                //Step 3: zoneHeaderColour
                if (company.zoneHeaderColour) {
                    let newColor: N_ColourPaletteType = {
                        ...company.zoneHeaderColour,
                        _id: new ObjectID(),
                        _partition: `companyRealm=${newCompanyId}`,
                    };
                    // newColor = omit(["id"], newColor);
                    await coloursCollection.insertOne(newColor);
                    company.zoneHeaderColour = newColor._id;
                }

                //Step 4: Divisions
                await asyncForEach(
                    company.divisions,
                    async (division: DivisionType, index: number) => {
                        let newDivision: N_DivisionType = { ...division, _id: "" };
                        newDivision = omit(["employees", "divisionId"], newDivision);
                        newDivision._id = new ObjectID();
                        //Participants
                        const participants: any = [];
                        const participantCollection = db.collection("Participant");
                        await asyncForEach(
                            newDivision.participants,
                            async (participant) => {
                                let newParticipant: N_ParticipantType = {
                                    ...participant,
                                    _id: new ObjectID(),
                                    _partition: `companyRealm=${newCompanyId}`,
                                };
                                newParticipant = omit(["id"], newParticipant);
                                await participantCollection.insertOne(newParticipant);
                                participants.push(newParticipant._id);
                            }
                        );
                        newDivision.participants = participants;
                        //Locations
                        newDivision.locations = newDivision.locations.map((location) => {
                            let newLocation: N_LocationType = {
                                ...location,
                                _id: new ObjectID(),
                            };
                            newLocation = omit(["locationId"], newLocation);
                            return newLocation;
                        });
                        company.divisions[index] = newDivision;
                    }
                );

                //Step 5: Magnets.
                const defaultMagnets: any = [];
                const magnetCollection = db.collection("Magnet");
                await asyncForEach(company.defaultMagnets, async (magnet) => {
                    let newMagnet: N_MagnetType = {
                        ...magnet,
                        _id: new ObjectID(),
                        _partition: `companyRealm=${newCompanyId}`,
                    };
                    // newMagnet = omit(["id"], newMagnet);
                    await magnetCollection.insertOne(newMagnet);
                    defaultMagnets.push(newMagnet._id);
                });
                company.defaultMagnets = defaultMagnets;

                //Step 6: Organization Metadata.
                const metadatas: any = [];
                // const metadataCollection = db.collection("SettingsMetadata");
                await asyncForEach(company.organisationMetadata, async (metaData) => {
                    let newMetadata: N_SettingsMetadataType = {
                        ...metaData,
                        _id: new ObjectID(),
                    };
                    // newMetadata = omit(["settingsMetadataId"], newMetadata);
                    // await metadataCollection.insertOne(newMetadata);
                    metadatas.push(newMetadata);
                });
                company.organisationMetadata = metadatas;

                //Step 7: Single Template:
                const singleTemplates: any = [];
                const singleTemplateCollection = db.collection("SingleTemplate");
                const labelCollection = db.collection("Label");
                const newTemplateIds: any = [];
                await asyncForEach(company.singleTemplates, async (singleTemplate) => {
                    let n: N_SingleTemplateType = {
                        ...singleTemplate,
                        _id: new ObjectID(),
                        _partition: `companyRealm=${newCompanyId}`,
                    };

                    const labels: any = [];
                    await asyncForEach(singleTemplate.labels, async (label) => {
                        let newLabel: N_LabelType = {
                            ...label,
                            _id: new ObjectID(),
                            _partition: `companyRealm=${newCompanyId}`,
                        };
                        await labelCollection.insertOne(newLabel);
                        labels.push(newLabel._id);
                    });
                    n.labels = labels;

                    const magnets: any = [];
                    await asyncForEach(singleTemplate.magnets, async (magnet) => {
                        let newMagnet: N_MagnetType = {
                            ...magnet,
                            _id: new ObjectID(),
                            _partition: `companyRealm=${newCompanyId}`,
                        };
                        // newMagnet = omit(["id"], newMagnet);
                        await magnetCollection.insertOne(newMagnet);
                        magnets.push(newMagnet._id);
                    });
                    n.magnets = magnets;
                    n.templateId = null;
                    if (!n.deleted) {
                        let realmUrlSplit = n.realmUrl
                            .replace(
                                "realms://changeway-development.de1a.cloud.realm.io/",
                                ""
                            )
                            .split("/");
                        if (realmUrlSplit.length === 3) {
                            ///auth0_5e70a715c190f70c8ab66ce7/workshop/f2fba1e4-60d9-4caf-809f-95671f0a8c4d
                            const workShopUUID = realmUrlSplit[2];
                            const userId = realmUrlSplit[0].replace("_", "|");
                            const existingWorkshopId = workshopIds.find(
                                (x: any) => x.uuid === workShopUUID
                            );
                            if (existingWorkshopId) {
                                n.realmUrl = `workshopRealm=${existingWorkshopId._id}`;
                                //Add permission.
                                await UserCollection.updateOne(
                                    { userId },
                                    { $push: { workshops: `workshopRealm=${existingWorkshopId._id}` } })
                            } else {
                                const _id = new ObjectID();
                                n.realmUrl = `workshopRealm=${_id}`;
                                // n.templateId = _id;
                                const key = `ids.[${workShopUUID}]`
                                await idCollection.updateOne(
                                    {
                                        "user.id": userId,
                                        type: "workshop",
                                    },
                                    {
                                        $set: {
                                            type: "workshop",
                                            [key]: _id,
                                            user: {
                                                id: userId,
                                                _id: userIds[userId] || new ObjectID(),
                                            },
                                        },
                                    },
                                    { upsert: true }
                                );
                                await workshopIDCollection.insertOne({ _id, uuid: workShopUUID });

                                await UserCollection.updateOne(
                                    { userId },
                                    { $push: { workshops: `workshopRealm=${_id}` } })
                            }
                        }
                    }

                    if (n.templateMetadata) {
                        let _id = null;
                        const existingTemplateId = templateIds.find(
                            (x: any) => x.uuid === n.templateMetadata.templateId
                        );

                        if (existingTemplateId) {
                            _id = existingTemplateId._id;
                        } else {
                            _id = new ObjectID();
                            newTemplateIds.push({ uuid: n.templateMetadata.templateId, _id });
                        }
                        if (!n.templateMetadata.visualName) {
                            n.templateMetadata.visualName = "";
                        }
                        n.templateMetadata = {
                            ...n.templateMetadata,
                            _id,
                        };
                        delete n.templateMetadata.templateId;
                    }
                    n = omit(["singleTemplateId"], n);
                    await singleTemplateCollection.insertOne(n);
                    singleTemplates.push(n._id);
                });
                company.singleTemplates = singleTemplates;







                //Step 8: Workshop Templates
                const workshopTemplates: any = [];
                const workshopTemplateCollection = db.collection("WorkshopTemplate");
                await asyncForEach(
                    company.workshopTemplates,
                    async (workshopTemplate) => {
                        let n: N_WorkshopTemplateType = {
                            ...workshopTemplate,
                            _id: new ObjectID(),
                            _partition: `companyRealm=${newCompanyId}`,
                        };

                        const labels: any = [];
                        await asyncForEach(workshopTemplate.labels, async (label) => {
                            let newLabel: N_LabelType = {
                                ...label,
                                _id: new ObjectID(),
                                _partition: `companyRealm=${newCompanyId}`,
                            };
                            await labelCollection.insertOne(newLabel);
                            labels.push(newLabel._id);
                        });
                        n.labels = labels;

                        const magnets: any = [];
                        await asyncForEach(workshopTemplate.magnets, async (magnet) => {
                            let newMagnet: N_MagnetType = {
                                ...magnet,
                                _id: new ObjectID(),
                                _partition: `companyRealm=${newCompanyId}`,
                            };
                            // newMagnet = omit(["id"], newMagnet);
                            await magnetCollection.insertOne(newMagnet);
                            magnets.push(newMagnet._id);
                        });
                        n.magnets = magnets;

                        if (!n.deleted) {
                            let realmUrlSplit = n.realmUrl
                                .replace(
                                    "realms://changeway-development.de1a.cloud.realm.io/",
                                    ""
                                )
                                .split("/");
                            if (realmUrlSplit.length === 3) {
                                ///auth0_5e70a715c190f70c8ab66ce7/workshop/f2fba1e4-60d9-4caf-809f-95671f0a8c4d
                                const workShopUUID = realmUrlSplit[2];
                                const userId = realmUrlSplit[0].replace("_", "|");
                                const existingWorkshopId = workshopIds.find(
                                    (x: any) => x.uuid === workShopUUID
                                );
                                if (existingWorkshopId) {
                                    n.realmUrl = `workshopRealm=${existingWorkshopId._id}`;
                                    n.workshopId = existingWorkshopId._id;
                                    await UserCollection.updateOne(
                                        { userId },
                                        { $push: { workshops: `workshopRealm=${existingWorkshopId._id}` } })
                                } else {
                                    const _id = new ObjectID();
                                    n.realmUrl = `workshopRealm=${_id}`;
                                    n.workshopId = _id;
                                    const key = `ids.[${workShopUUID}]`
                                    await idCollection.updateOne(
                                        {
                                            "user.id": userId,
                                            type: "workshop",
                                        },
                                        {
                                            $set: {
                                                type: "workshop",
                                                [key]: _id,
                                                user: {
                                                    id: userId,
                                                    _id: userIds[userId] || new ObjectID(),
                                                },
                                            },
                                        },
                                        { upsert: true }
                                    );
                                    await workshopIDCollection.insertOne({ _id, uuid: workShopUUID });
                                    //Add permission.
                                    await UserCollection.updateOne(
                                        { userId },
                                        { $push: { workshops: `workshopRealm=${_id}` } })
                                }
                            } else {
                                n.workshopId = null;
                            }
                        }
                        n.workshopId = null;
                        n.templates = n.templates.map((t) => {
                            let _id = null;
                            const existingTemplateId = templateIds.find(
                                (x: any) => x.uuid === t.templateId
                            );
                            if (existingTemplateId) {
                                _id = existingTemplateId._id;
                            } else {
                                _id = new ObjectID();
                                newTemplateIds.push({ uuid: t.templateId, _id });
                            }
                            if (!t.visualName) {
                                t.visualName = "";
                            }
                            delete t.templateId;
                            return { ...t, _id };
                        });

                        n = omit(["workshopTemplateId"], n);
                        await workshopTemplateCollection.insertOne(n);
                        workshopTemplates.push(n._id);
                    }
                );

                company.workshopTemplates = workshopTemplates;
                if (newTemplateIds.length > 0) {
                    await templateIDCollection.insertMany(newTemplateIds);
                }
                const companyCollection = db.collection("Company");

                //Insert the Company.
                try {
                    await companyCollection.insertOne(company);
                } catch (e) {
                    console.log("Error Inserting the company");
                }
            } else {
                logger.error(`Company ${companyId} not found. So, Ignoring.`);

            }
            resolve(true);
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
};

export default MigrateCompanySchemas;
