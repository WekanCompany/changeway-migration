import { Db, ObjectId } from "mongodb"
import winston from "winston"
import { N_FileType } from "../models/mongodb-realm/common/File";
import { N_CompanyType } from "../models/mongodb-realm/user/Company";
import { N_ProfileType } from "../models/mongodb-realm/user/Profile";
import { FileType } from "../models/ros/common/File";
import { CompanyType } from "../models/ros/user/Company";
import { ProfileType } from "../models/ros/user/Profile";
import { omit, readRealm } from "../utils";
import { compact } from 'lodash';
import { N_UserType } from "../models/mongodb-realm/user/User";
var ObjectID = require("bson-objectid");

const MigrateUserSchemas = (oldUserId: any, userObjectId: any, realm: Realm, db: Db, logger: winston.Logger, idDB: Db) => {
    return new Promise(async (resolve, reject) => {
        try {

            logger.info(`Migrating the user ${oldUserId}`)

            const profiles = await readRealm<ProfileType>(
                realm,
                "Profile"
            );
            if (profiles && profiles.length > 0) {
                let userProfile: N_ProfileType = profiles[0] as N_ProfileType;

                //0) Add _id and _partition for the user Profile.

                userProfile._id = new ObjectId()
                userProfile._partition = `userRealm=${oldUserId}`

                //1) Migrate all the files first to a files collection.
                let allFiles: FileType[] = [...userProfile.files, userProfile.profilePicture, userProfile.logoFile]
                const companyFiles: FileType[] = userProfile.companies.map((c: CompanyType) => c.logoFile);
                allFiles.push(...companyFiles);
                allFiles = compact(allFiles)
                const fileMapper: any = {};
                const companyMapper: any = {};
                const workshopMapper: any = {};
                const newFiles: N_FileType[] = allFiles.map((f: FileType) => {
                    let _id = new ObjectID();
                    fileMapper[f.fileId] = _id;
                    f = omit(["fileId"], f);
                    return { ...f, _id, _partition: `userRealm=${oldUserId}` }
                })
                const FilesCollection = db.collection("File");
                if (allFiles.length > 0) {
                    await FilesCollection.insertMany(newFiles);
                }

                if (userProfile.profilePicture) {
                    userProfile.profilePicture = fileMapper[userProfile.profilePicture.fileId]
                }

                if (userProfile.logoFile) {
                    userProfile.logoFile = fileMapper[userProfile.logoFile.fileId]
                }


                //2) Map Comapnies.
                userProfile.companies = userProfile.companies.map((c) => {
                    const _id = new ObjectID();
                    companyMapper[c.companyId] = _id;
                    c.url = `companyRealm=${_id}`
                    c.companyId = _id
                    if (c.logoFile) {
                        c.logoFile = fileMapper[c.logoFile.fileId]
                    }
                    return { ...c, _id };
                });

                //3) Map Workshop
                userProfile.workshops = userProfile.workshops.map((w) => {
                    const _id = new ObjectID();
                    workshopMapper[w.workshopId] = _id;
                    w.workshopId = _id;
                    w.url = `workshopRealm=${_id}`
                    return { ...w, _id };
                });
                //4) Map Tokens
                userProfile.token = { ...userProfile.token, _id: new ObjectId() }

                //5) Map Files
                userProfile.files = userProfile.files.map((f: any) => {
                    return fileMapper[f.fileId];
                });

                // 6) Create a new Profile.
                const ProfileCollection = db.collection("Profile");
                await ProfileCollection.insertOne(userProfile);

                // 7) Create a User.
                const user: N_UserType = {
                    _id: userObjectId,
                    _partition: `userRealm=${oldUserId}`,
                    name: userProfile.email,
                    canReadPartitions: [`userRealm=${oldUserId}`],
                    memberOf: [],
                    companies: Object.values(companyMapper).map((x) => `companyRealm=${x}`),
                    everydayBoards: [],
                    userId: oldUserId,
                    workshops: Object.values(workshopMapper).map((x) => `workshopRealm=${x}`)
                }
                const UserCollection = db.collection("User");
                await UserCollection.insertOne(user);

                logger.info(`Migration completed for the user ${oldUserId}`)

            } else {
                logger.error(`User Profile not present for the user ${oldUserId}, So Skipping migration.`)
            }
            resolve(true)
        } catch (e) {
            console.log(e);
            reject(e)
        }
    })
}

export default MigrateUserSchemas;
