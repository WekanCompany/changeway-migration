import dotenv from 'dotenv';
import winston from 'winston';
import Realm from 'realm';
import { expandObject, initLogger } from './utils';
import { MongoClient } from 'mongodb';
const configuration: any = dotenv.config();



// ROS Informations
let realmServerUrl: string;
let realmUsername: string;
let realmPassword: string;

// Target MongoDB.
let targetMongoDBUrl;
let targetMongoDBName;

// Logger
let logDirPath;
let logger: winston.Logger



if (configuration.error) {
    console.error('Configuration file not found');
    process.exit(0);
}

if (!configuration.parsed) {
    console.error('Configuration failed to parse');
}

realmServerUrl = configuration.parsed['REALM_SERVER_URL'];
realmUsername = configuration.parsed['REALM_USER'];
realmPassword = configuration.parsed['REALM_PASSWORD'];
targetMongoDBUrl = configuration.parsed['TARGET_MONGODB_URI'];
targetMongoDBName = configuration.parsed['TARGET_MONGODB_NAME'];
logDirPath = configuration.parsed['LOG_DIR'];
logger = initLogger(`${logDirPath}/${Date.now().toString()}.log`);

logger.info(`Environment Variables are good and clear, Starting Migration script.`);



const migrate = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            // Realm Credentials
            const credentials = Realm.Sync.Credentials.usernamePassword(
                realmUsername,
                realmPassword
            );
            const user = await Realm.Sync.User.login(
                `https://${realmServerUrl}`,
                credentials
            );
            logger.info(`Logged in as ${expandObject(user)}`);
            resolve(true)
        } catch (e) {
            reject(e)
        }
    })
}



migrate().then(() => {
    logger.info(`Migration script completed successfully.`);
}).catch((error) => {
    logger.error(`Migration script crashed with the error ${error}`)
})