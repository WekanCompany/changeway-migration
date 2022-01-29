import dotenv from "dotenv";
import winston from "winston";
import { Db, MongoClient } from "mongodb";
import Realm from "realm";
import { asyncForEach, initLogger, openRealm } from "./utils";
import {
  CompanySchema,
  EverydaySchema,
  GlobalKPI,
  GlobalUserAndNotification,
  UserSchema,
  WorkshopSchema,
} from "./models/ros";
import UserList from "./../user-list.json";
import DeletedWorkshopsList from "./../deletedWorkshops.json";
import MigrateGlobalUserAndNotification from "./migrations/globalUserAndNotifications";
import MigrateUserSchemas from "./migrations/userSchema";
import MigrateGlobalKPI from "./migrations/globalKPIMigrations";
import MigrateCompanySchemas from "./migrations/companySchema";
import MigrateWorkshopSchemas from "./migrations/workshopSchema";
import { MigrateEverydaySchemas } from "./migrations/everydayMigration";

const configuration: any = dotenv.config();
var ObjectID = require("bson-objectid");

// ROS Informations
let realmServerUrl: string;
let realmUsername: string;
let realmPassword: string;

// Target MongoDB.
let targetMongoDBUrl: string;
let targetMongoDBName: string;

let db: Db;
let idDB: Db;
let userIds: any;
let deletedWorkshopId: any;

// Logger
let logDirPath;
let logger: winston.Logger;

if (configuration.error) {
  console.error("Configuration file not found");
  process.exit(0);
}

if (!configuration.parsed) {
  console.error("Configuration failed to parse");
}

realmServerUrl = configuration.parsed["REALM_SERVER_URL"];
realmUsername = configuration.parsed["REALM_USER"];
realmPassword = configuration.parsed["REALM_PASSWORD"];
targetMongoDBUrl = configuration.parsed["TARGET_MONGODB_URI"];
targetMongoDBName = configuration.parsed["TARGET_MONGODB_NAME"];
logDirPath = configuration.parsed["LOG_DIR"];
logger = initLogger(`${logDirPath}/${Date.now().toString()}.log`);

logger.info(
  `Environment Variables are good and clear, Starting Migration script.`
);

const userIDRunner = async () => {
  return new Promise(async (resolve, reject) => {
    userIds = {};
    let userIdsArray:any=[];
    deletedWorkshopId = [];
    // Map User Id's.
    const { Account }: any = UserList;
    if (Account) {
      Account.forEach((user: any) => {
        const { providerId: userId }: any = user;
        // if (
        //   userId === "auth0|5e8f20094909340c15125d87" ||
        //   userId === "auth0|5f846a94d096aa006e7bc587"
        // ) {
        //   let _id= new ObjectID();
        //   userIds[userId] = _id;
        //   userIdsArray.push({uuid:userId, _id})
        // }
        if (userId.startsWith("auth0|")) {
          let _id= new ObjectID();
          userIds[userId] = _id;
          userIdsArray.push({uuid:userId, _id})
        }
        
      });
      const userIdColl= idDB.collection("userIdColl");
        if(userIdsArray.length>0){
          await userIdColl.insertMany(userIdsArray);
        }
    }
    const { DeletedWorkshops }: any = DeletedWorkshopsList;
    if (DeletedWorkshops) {
      deletedWorkshopId = DeletedWorkshops.map(
        (d: any) => d.deletedWorkshopsId
      );
    }
    resolve(true);
  });
};

/**
 *
 * Change Way Migrations.
 *
 * Migration Process steps are as follows.
 *
 *  - Step1 - Connect to MONGODB Client.
 *  - Step2 - Mapping User Id's to equivalent Object Id and store in a JSON file for usage.
 *  - Step3 - Create a Realm Credentials and login to ROS.
 *  - Step4 - Migrate Global Users and Notifications.
 *  - Step5 - Migrate Global KPI.
 *  - Step6 - Migrate User Schema.
 *  - Step7 - Migrate Company Schemas.
 *  - Step8 - Migrate Workshop Schemas.
 *  - Step8.1 - Migrate Workshop schemas for Single and Organization Templates.
 *  - Step9 - Migrate Everyday Schemas.
 *  - Step10 - Migrate Workshops for Everyday Schemas.
 *  - Step11 - Patch works after migration.
 *
 */

const migrate = async () => {
  return new Promise(async (resolve, reject) => {
    try {


      // Step1.
      /**
       * Connect to the DB.
       */
      const dbClient = new MongoClient(
        `${targetMongoDBUrl}/${targetMongoDBName}?retryWrites=true&w=majority`
      );

      dbClient.connect(async (err: any, dbClient) => {
        if (err) {
          logger.error(err);
          process.exit(0);
        }

        logger.info(`Connected to ${targetMongoDBName} database.`);

        if (dbClient) {
          db = dbClient.db(targetMongoDBName);
          idDB = dbClient.db("idDB");
        } else {
          logger.error("Db Cannot be opened.");
          process.exit(0);
        }

        // Step2.
        /**
         * User Id Mapper.
         */
        if (!UserList) {
          return reject(
            "User List is required to proceed. Please add a user-list.json file on the root directory downloaded from ROS."
          );
        }
        //User Id's Runner.
        await userIDRunner();

        // Step3.
        /**
         * Create a realm credential and login.
         */
        // Realm Credentials
        const credentials = Realm.Sync.Credentials.usernamePassword(
          realmUsername,
          realmPassword
        );
        const user = await Realm.Sync.User.login(
          `https://${realmServerUrl}`,
          credentials
        );

        // Step 4.
        /**
         * Migrate Global KPI.
         */
        logger.info(
          `Migration of Global KPI: realms://${realmServerUrl}/GlobalKPI`
        );
        const globalKPI: any = await openRealm(
          user,
          `realms://${realmServerUrl}/GlobalKPI`,
          GlobalKPI,
          logger
        );
        if (globalKPI) {
          await MigrateGlobalKPI(globalKPI, db, logger, idDB);
          globalKPI.close()
        }

        // Step 5.
        /**
         * Migrate Global Schemas.
         */
        logger.info(
          `Migration Global User and Notifications from path: realms://${realmServerUrl}/GlobalUserAndNotification`
        );
        const globalUserRealm: any = await openRealm(
          user,
          `realms://${realmServerUrl}/GlobalUserAndNotification`,
          GlobalUserAndNotification,
          logger
        );
        if (globalUserRealm) {
          await MigrateGlobalUserAndNotification(globalUserRealm, db, logger);
          globalUserRealm.close()
        }

        // Step 6.
        /**
         * Migrate User Schema
         */
        const userIdKeys = Object.keys(userIds);
        logger.info(`Migrating totally ${userIdKeys.length} Users.`);
        await asyncForEach(userIdKeys, async (userId) => {
          const userSchema = await openRealm(
            user,
            `realms://${realmServerUrl}/${userId.replace(
              "|",
              "_"
            )}/userProfile`,
            UserSchema,
            logger
          );
          if (userSchema) {
            await MigrateUserSchemas(
              userId,
              userIds[userId],
              userSchema,
              db,
              logger,
              idDB
            );
            userSchema.close();
          }
        });

        // // Step 7.
        // /**
        //  * Migrate User Organisation Schemas(Company Schemas).
        //  */
        const idCol = idDB.collection("id");

        const companies = await idCol.find({ type: "company" }).toArray();
        logger.info(`Migrating totally ${companies.length} Users Companies.`);
        await asyncForEach(companies, async (info) => {
          let ids = info.ids;
          ids = Object.keys(ids);
          logger.info(`User ${info.user.id} has ${ids.length} Companies.`);
          await asyncForEach(ids, async (companyId: string) => {
            try {
              // if (
              //   ["69f8a4c0-e5f1-41a3-afbe-eca530c21fff"].indexOf(companyId) !==
              //   -1
              // ) {
              //   //Omit this company, taking more time to migrate.
              //   return;
              // }
              // realms://changeway-development.de1a.cloud.realm.io/auth0_5e70a715c190f70c8ab66ce7/company/54ac7dfa-bd6c-4624-a7a2-41953e6547d1
              const companyRealm = await openRealm(
                user,
                `realms://${realmServerUrl}/${info.user.id.replace(
                  "|",
                  "_"
                )}/company/${companyId}`,
                CompanySchema,
                logger
              );
              if (companyRealm) {
                await MigrateCompanySchemas(
                  companyId,
                  info.ids[companyId],
                  info.user,
                  companyRealm,
                  db,
                  logger,
                  idDB,
                  userIds
                );
                companyRealm.close();
              }
            } catch (e) {
              logger.error(
                `Problem connection to the specific realm - realms://${realmServerUrl}/${info.user.id.replace(
                  "|",
                  "_"
                )}/company/${companyId}`
              );
            }
          });
        });

        // Step 8.
        /**
         * Migrate Workshop Schemas.
         */
        const profileCollection = await db.collection("Profile");
        const workshopCollection = await db.collection("Workshop");
        const workshopIdsCollection = await idDB.collection("workshops");
        const profiles = await profileCollection.find({}).toArray();
        logger.info(`Migrating totally ${profiles.length} User's Workshops.`);

        await asyncForEach(profiles, async (profile) => {//Jon
          let ids = profile.workshops;
          // ids = Object.keys(ids);
          await asyncForEach(ids, async (workshop:any) => {
            // Add Deleted Workshops Logic
            const realmPath = workshop.realmPath;
            const realmPathSplit = realmPath.split("/")
            const userId = realmPathSplit[3].replace("_","|");
            const workshopId = realmPathSplit[5];
            const existingWorkshop = await workshopCollection.findOne({workshopId});
            if(existingWorkshop){
              logger.error(`Workshop ${workshopId} is already migrated while running some other users profile.`);
              return;
            }
            const _id = await workshopIdsCollection.findOne({uuid:workshopId });
            if(!_id){
              logger.error(`Cant find the new _id for the old uuid for the workshop ${workshopId}`);
              return;
            }
            if (deletedWorkshopId.indexOf(workshopId) >= 0) {
              logger.error(`${workshop} is on the Deleted Workshop list, so Ignoring.`);
              return;
            }

            // if (
            //   [
            //     "0999c84a-f55b-4278-9f1a-caa60e2e4941",
            //     "72790171-3bb1-42e5-947d-a6bcf9120e38",
            //     "7c95e71f-ee9f-4c4b-8aeb-41ecaa17c6b6",
            //     "d170a020-810f-4bac-8805-5e75e5782f89",
            //     "f46f3bb9-6bd1-4f25-930e-485eddbc1803",
            //     "2de0fd49-59ee-4172-ad50-096507abdd24",
            //     "5762fc36-7f1b-436a-8a65-74dc53f3c6b2",
            //     "58c788d8-57a3-4f9c-b16b-472c346147dd",
            //     "99c6e913-3c92-4469-9ffe-cb81f56f6506",
            //     "95885cb9-0e2c-4adc-9d35-3c9ad23916f3",
            //     "d9d04657-52a7-4be9-8165-39332c1a5f12",
            //   ].indexOf(workshopId) === -1
            // ) {
            //   return;
            // }

            try {
              // realms://changeway-development.de1a.cloud.realm.io/auth0_5e70a715c190f70c8ab66ce7/company/54ac7dfa-bd6c-4624-a7a2-41953e6547d1
              const workshopRealm = await openRealm(
                user,
                realmPath,
                WorkshopSchema,
                logger
              );
              if (workshopRealm) {
                await MigrateWorkshopSchemas(
                  workshopId,//workshop uuid
                  _id._id, //new _id of the workshop
                  {_id:userIds[userId],id:userId}, //the actual users who created the workshop
                  workshopRealm, //the Realm we take on line 342
                  db,
                  logger,
                  idDB
                );
                workshopRealm.close();
              }
            } catch (e) {
              console.log(e);
              reject(e);
            }
          });
        });
        // Step 8.1.
        /**
         * Migrate Workshop Schemas for Single and Organization Temaplates.
         */
         const workshops = await idCol.find({ type: "workshop" }).toArray();
         logger.info(`Migrating totally ${workshops.length} User's Workshops.`);
 
         await asyncForEach(workshops, async (workshop) => {
           let ids = workshop.ids;
           ids = Object.keys(ids);
           await asyncForEach(ids, async (workshopId: string) => {
             // Add Deleted Workshops Logic
 
             if (deletedWorkshopId.indexOf(workshopId) >= 0) {
               logger.error(`${workshopId} is on the Deleted Workshop list, so Ignoring.`);
               return;
             }
 
             // if (
             //   [
             //     "0999c84a-f55b-4278-9f1a-caa60e2e4941",
             //     "72790171-3bb1-42e5-947d-a6bcf9120e38",
             //     "7c95e71f-ee9f-4c4b-8aeb-41ecaa17c6b6",
             //     "d170a020-810f-4bac-8805-5e75e5782f89",
             //     "f46f3bb9-6bd1-4f25-930e-485eddbc1803",
             //     "2de0fd49-59ee-4172-ad50-096507abdd24",
             //     "5762fc36-7f1b-436a-8a65-74dc53f3c6b2",
             //     "58c788d8-57a3-4f9c-b16b-472c346147dd",
             //     "99c6e913-3c92-4469-9ffe-cb81f56f6506",
             //     "95885cb9-0e2c-4adc-9d35-3c9ad23916f3",
             //     "d9d04657-52a7-4be9-8165-39332c1a5f12",
             //   ].indexOf(workshopId) === -1
             // ) {
             //   return;
             // }
 
             try {
               // realms://changeway-development.de1a.cloud.realm.io/auth0_5e70a715c190f70c8ab66ce7/company/54ac7dfa-bd6c-4624-a7a2-41953e6547d1
               const workshopRealm = await openRealm(
                 user,
                 `realms://${realmServerUrl}/${workshop.user.id.replace(
                   "|",
                   "_"
                 )}/workshop/${workshopId}`,
                 WorkshopSchema,
                 logger
               );
               if (workshopRealm) {
                 await MigrateWorkshopSchemas(
                   workshopId,
                   workshop.ids[workshopId],
                   workshop.user,
                   workshopRealm,
                   db,
                   logger,
                   idDB
                 );
                 workshopRealm.close();
               }
             } catch (e) {
               console.log(e);
               reject(e);
             }
           });
         });

        // resolve(true)
        // return;

        // Step 9.
        /**
         * Migrate Everyday Schemas.
         */

        await asyncForEach(companies, async (info: any) => {
          let ids = info.ids;
          ids = Object.keys(ids);
          logger.info(
            `User ${info.user.id} has ${ids.length} Companies. So, Migration all Everyday's.`
          );
          await asyncForEach(ids, async (companyId: string) => {
            try {
              // if (
              //   ["0839822c-e821-41b8-9698-830a9ffe2a3c"].indexOf(companyId) ===
              //   -1
              // ) {
              //   return;
              // }

              // realms://changeway-development.de1a.cloud.realm.io/auth0_5e70a715c190f70c8ab66ce7/company/54ac7dfa-bd6c-4624-a7a2-41953e6547d1/everyday
              const everyDayRealm = await openRealm(
                user,
                `realms://${realmServerUrl}/${info.user.id.replace(
                  "|",
                  "_"
                )}/company/${companyId}/everyday`,
                EverydaySchema,
                logger
              );
              if (everyDayRealm) {
                await MigrateEverydaySchemas(
                  companyId,
                  info.ids[companyId],
                  info.user,
                  everyDayRealm,
                  db,
                  logger,
                  idDB
                );
                everyDayRealm.close();
              }
            } catch (e) {
              console.log(e);
              reject(e);
            }
          });
        });

        // Step 10.
        /**
         * Migrate Workshops for Everyday Schemas.
         */

        const everydayWorkshopIds = idDB.collection("everydayworkshops");
        const everyDayBoards: any = await everydayWorkshopIds
          .find({})
          .toArray();
        await asyncForEach(everyDayBoards, async (eB: any) => {
          logger.info(
            `Migrating Everybay board ${eB.uuid} of the user ${eB.user.id}.`
          );
          try {
            // realms://changeway-development.de1a.cloud.realm.io//auth0_5d25f12c647c510cb7f8c1d9/company/67f32310-eadb-4f3b-a920-7c80fa45bc4b/everyday/workshop/2073b74c-0478-4ba5-ab2a-51cb44a56b25
            const everyDayRealm = await openRealm(
              user,
              `realms://${realmServerUrl}/${eB.user.id.replace(
                "|",
                "_"
              )}/company/${eB.company.companyId}/everyday/workshop/${eB.uuid}`,
              WorkshopSchema,
              logger
            );
            if (everyDayRealm) {
              const { company, user, boardId, uuid } = eB;
              await MigrateWorkshopSchemas(
                uuid,
                boardId,
                user,
                everyDayRealm,
                db,
                logger,
                idDB,
                `everydayRealm=true&companyRealm=${company.newCompanyId}&workshopRealm=${boardId}`
              );
              everyDayRealm.close();
            }
          } catch (e) {
            console.log(e);
            reject(e);
          }
        });

        logger.info(`After Migration Patch Works.`);
        //After Migration Patch Works.
        //1) ParetoOfGapsColl.
        const ParetoOfGapsColl = db.collection("ParetoOfGaps");
        const EventTaskColl = db.collection("EventTask");
        const listOfParetoOfGaps = await ParetoOfGapsColl.find({
          issueUUID: { "$exists": true, "$ne": "" },
        }).toArray();

        await asyncForEach(listOfParetoOfGaps, async (pG: any) => {
          try {
            const eventTask = await EventTaskColl.findOne({
              cardId: pG.issueUUID,
            });
            if (eventTask) {
              await ParetoOfGapsColl.updateOne(
                { _id: pG._id },
                { $set: { issue: eventTask._id } }
              );
            }
          } catch (e) {
            console.log(e);
          }
        });
        const ReasonForMissColl = db.collection("ReasonForMiss");
        const listOfRFM = await ReasonForMissColl.find({
          issueUUID: { "$exists": true, "$ne": "" },
        }).toArray();

        await asyncForEach(listOfRFM, async (rm: any) => {
          try {
            const eventTask = await EventTaskColl.findOne({
              cardId: rm.issueUUID,
            });
            if (eventTask) {
              await ReasonForMissColl.updateOne(
                { _id: rm._id },
                { $set: { issue: eventTask._id } }
              );
            }
          } catch (e) {
            console.log(e);
          }
        });
        resolve(true);
      });
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

migrate()
  .then(() => {
    logger.info(`Migration script completed successfully.`);
  })
  .catch((error) => {
    logger.error(`Migration script crashed with the error ${error}`);
  });
