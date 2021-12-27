import dotenv from "dotenv";
import winston from "winston";
import { Db, MongoClient } from "mongodb";
import Realm from "realm";
import { asyncForEach, initLogger, openRealm, readRealm } from "./utils";
import { GlobalUserAndNotification } from "./models/ros";
import { GlobalUserType } from "./models/ros/global/users";
import UserList from "./../user-list.json";
import { N_NotificationType } from "./models/mongodb-realm";
import { NotificationType } from "./models/ros/global/notifications";
import MigrateGlobalUserAndNotification from "./migrations/globalUserAndNotifications";

const configuration: any = dotenv.config();
var ObjectID = require("bson-objectid");
var fs = require("fs");

// ROS Informations
let realmServerUrl: string;
let realmUsername: string;
let realmPassword: string;

// Target MongoDB.
let targetMongoDBUrl: string;
let targetMongoDBName: string;

let db: Db;

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
    const users: any = {};
    // Map User Id's.
    const { User }: any = UserList;
    if (User) {
      User.forEach((user: any) => {
        const { userId }: any = user;
        if (userId.startsWith("auth0_")) {
          users[userId] = new ObjectID();
        }
      });

      fs.writeFile(
        `${__dirname}/user-ids.json`,
        JSON.stringify(users),
        function (err: any) {
          if (err) {
            return reject(err);
          }
          return resolve("success");
        }
      );
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
        } else {
          logger.error("Db Cannot be opened.");
          process.exit(0);
        }

        // Realm Credentials
        const credentials = Realm.Sync.Credentials.usernamePassword(
          realmUsername,
          realmPassword
        );
        const user = await Realm.Sync.User.login(
          `https://${realmServerUrl}`,
          credentials
        );

        // Step 3.

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
        }

        // Step 4.

        logger.info(
          `Migration Global User and Notifications from path: realms://${realmServerUrl}/GlobalUserAndNotification`
        );

        resolve(true);
      });
    } catch (e) {
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
