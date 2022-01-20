import util from "util";
import winston from "winston";

const customFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${new Date(timestamp).toISOString()} ${level}: ${message}`;
});

export function initLogger(path: string): winston.Logger {
  return winston.createLogger({
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.prettyPrint(),
      customFormat
    ),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: path }),
    ],
  });
}

export function expandObject(obj: Object) {
  return util.inspect(obj, false, null, true);
}

export function openRealm(
  user: Realm.Sync.User,
  url: string,
  schema: any[],
  logger: winston.Logger
): Promise<Realm | null> {
  return new Promise(async (resolve, reject) => {
    const realmConfiguration = user.createConfiguration();
    realmConfiguration.sync = {
      user: user,
      fullSynchronization: true,
      url: url,
    };

    realmConfiguration.schema = schema;

    logger.info(
      `Connecting to the realm server ${realmConfiguration.sync.url}`
    );
    return Realm.open(realmConfiguration)
      .then((realm) => resolve(realm))
      .catch((e) => resolve(null));
  });
}

export function readRealm<T>(
  realm: Realm,
  realmCollectionName: string
): Promise<T[] | null> {
  return new Promise(async (resolve, reject) => {
    try {
      const collectionDocuments = realm
        .objects<T>(realmCollectionName)
        .map((obj) => obj.toJSON());
      resolve(collectionDocuments);
    } catch (e) {
      console.log(e);
      reject(null);
    }
  });
}

export async function asyncForEach<T>(
  array: Array<T>,
  callback: (item: T, index: number) => Promise<void>
) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index);
  }
}

export function omit(keys: any, obj: any): any {
  if (!keys.length) return obj;
  const { [keys.pop()]: omitted, ...rest } = obj;
  return omit(keys, rest);
}
