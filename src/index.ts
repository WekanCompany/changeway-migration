import dotenv from "dotenv";
import winston from "winston";
import { Db, MongoClient } from "mongodb";
import Realm from "realm";
import { asyncForEach, initLogger, openRealm } from "./utils";
import { CompanySchema, GlobalKPI, GlobalUserAndNotification, UserSchema, WorkshopSchema } from "./models/ros";
import UserList from "./../user-list.json";
import MigrateGlobalUserAndNotification from "./migrations/globalUserAndNotifications";
import MigrateUserSchemas from "./migrations/userSchema";
import MigrateGlobalKPI from "./migrations/globalKPIMigrations";
import MigrateCompanySchemas from "./migrations/companySchema";
import MigrateWorkshopSchemas from "./migrations/workshopSchema";

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
let userIds: any

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
    // Map User Id's.
    const { User }: any = UserList;
    if (User) {
      User.forEach((user: any) => {
        const { userId }: any = user;
        if (userId === "auth0|5e70a6d23119a80c87e2d085" || userId==="auth0|6095329d449d2a0068d829ef") {
          userIds[userId] = new ObjectID();
        }
      });
      resolve(true)
    }
  });
};

/**
 *
 * Change Way Migrations.
 *
 * Migration Process steps are as follows.
 *
 *  - Mapping User Id's to equivalent Object Id and store in a JSON file for usage.
 *  - Connect to MONGODB Client.
 *  - Create a Realm Credentials and login to ROS.
 *  - Migrate Global Users and Notifications.
 *  - Migrate Global KPI.
 *  - Migrate User Schema.
 *
 */

const migrate = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      // Step1.
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

      // Step2.
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
          const idCol = idDB.collection('id');
          await idCol.deleteMany({}); 
        } else {
          logger.error("Db Cannot be opened.");
          process.exit(0);
        }

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
        // const globalKPI: any = await openRealm(
        //   user,
        //   `realms://${realmServerUrl}/GlobalKPI`,
        //   GlobalKPI,
        //   logger
        // );
        // if (globalKPI) {
        //   await MigrateGlobalKPI(globalKPI, db, logger, idDB);
        // }


        // Step 5.
        /**
         * Migrate Global Schemas.
         */
        logger.info(
          `Migration Global User and Notifications from path: realms://${realmServerUrl}/GlobalUserAndNotification`
        );
        // const globalUserRealm: any = await openRealm(
        //   user,
        //   `realms://${realmServerUrl}/GlobalUserAndNotification`,
        //   GlobalUserAndNotification,
        //   logger
        // );
        // if (globalUserRealm) {
        //   await MigrateGlobalUserAndNotification(globalUserRealm, db, logger);
        // }

        // Step 6.
        /**
         * Migrate User Schema
         */
        const userIdKeys = Object.keys(userIds);
        logger.info(
          `Migrating totally ${userIdKeys.length} Users.`
        );
        await asyncForEach(userIdKeys, async (userId) => {
          const userSchema = await openRealm(
            user,
            `realms://${realmServerUrl}/${userId.replace("|","_")}/userProfile`,
            UserSchema,
            logger,
          );
          if (userSchema) {
            await MigrateUserSchemas(userId, userIds[userId], userSchema, db, logger, idDB);
            userSchema.close()
          }
        });


        // Step 7.
        /**
         * Migrate User Organisation Schemas(Company Schemas).
         */
        const idCol = idDB.collection('id');

        const companies = await idCol.find({ type: "company" }).toArray();
        logger.info(
          `Migrating totally ${companies.length} Users Companies.`
        );

        await asyncForEach(companies, async (info) => {
          let ids = info.ids;
          ids = Object.keys(ids);
          logger.info(
            `User ${info.user.id} has ${ids.length} Companies.`
          );
          await asyncForEach(ids, async (companyId: string) => {
            try {
              // realms://changeway-development.de1a.cloud.realm.io/auth0_5e70a715c190f70c8ab66ce7/company/54ac7dfa-bd6c-4624-a7a2-41953e6547d1
              const companyRealm = await openRealm(
                user,
                `realms://${realmServerUrl}/${info.user.id.replace("|","_")}/company/${companyId}`,
                CompanySchema,
                logger,
              );
              if (companyRealm) {
                await MigrateCompanySchemas(companyId, info.ids[companyId], info.user, companyRealm, db, logger, idDB)
                companyRealm.close()
              }
            } catch (e) {
              logger.error(`Problem connection to the specific realm - realms://${realmServerUrl}/${info.user.id.replace("|","_")}/company/${companyId}`)
            }
          })

        });

        // Step 7.
        /**
         * Migrate Workshop Schemas.
         */
        const workshops = await idCol.find({ type: "workshop" }).toArray();
        logger.info(
          `Migrating totally ${workshops.length} Workshops.`
        );

        await asyncForEach(workshops, async (workshop) => {
          if (workshop.user.id !== "auth0|6095329d449d2a0068d829ef") {
            return
          }
          let ids = workshop.ids;
          ids = Object.keys(ids);
          await asyncForEach(ids, async (workshopId: string) => {
            if (workshopId !== "5762fc36-7f1b-436a-8a65-74dc53f3c6b2") {
              return
            }
            try {
              // realms://changeway-development.de1a.cloud.realm.io/auth0_5e70a715c190f70c8ab66ce7/company/54ac7dfa-bd6c-4624-a7a2-41953e6547d1
              const workshopRealm = await openRealm(
                user,
                `realms://${realmServerUrl}/${workshop.user.id.replace("|","_")}/workshop/${workshopId}`,
                WorkshopSchema,
                logger,
              );
              if (workshopRealm) {
                await MigrateWorkshopSchemas(workshopId, workshop.ids[workshopId], workshop.user, workshopRealm, db, logger, idDB)
                workshopRealm.close()
              }
            } catch (e) {

            }

          });

        });


        resolve(true);
      });
    } catch (e) {
      console.log(e)
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
