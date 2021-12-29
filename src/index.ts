import dotenv from "dotenv";
import winston from "winston";
import { Db, MongoClient } from "mongodb";
import Realm from "realm";
import { asyncForEach, initLogger, openRealm } from "./utils";
import { GlobalUserAndNotification, UserSchema } from "./models/ros";
import UserList from "./../user-list.json";
import MigrateGlobalUserAndNotification from "./migrations/globalUserAndNotifications";
import MigrateUserSchemas from "./migrations/userSchema";

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
        if (userId.startsWith("auth0_")) {
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
          // await MigrateGlobalUserAndNotification(globalUserRealm, db, logger);
        }

        // Step 5.
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
            `realms://${realmServerUrl}/${userId}/userProfile`,
            UserSchema,
            logger,
          );
          if (userSchema) {
            await MigrateUserSchemas(userId, userIds[userId], userSchema, db, logger, idDB);
            userSchema.close()
          }
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
