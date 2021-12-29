import { Db } from "mongodb";
import winston from "winston";
import { GlobalUserType } from "../models/ros/global/users";
import { asyncForEach, readRealm } from "../utils";

const MigrateGlobalUserAndNotification = (globalUserRealm: any, db: Db, logger: winston.Logger) => {
    return new Promise(async (resolve, reject) => {
        try {
            const users = await readRealm<GlobalUserType>(
                globalUserRealm,
                "GlobalUser"
            );
            if (users) {
                logger.info(
                    `Migration totally ${users.length} Users and their Notifications.`
                );
                const NotificationCollection = db.collection("Notification");
                const GlobalUsersCollection = db.collection("GlobalUser");
                await asyncForEach(users, async (user: GlobalUserType) => {
                    let { notifications } = user;
                    let notificationIds: any = [];
                    if (notifications.length > 0) {
                        notifications = notifications.map((x: any) => {
                            delete x.id;
                            x._partition = "global";
                            return x;
                        })
                        notificationIds = await (
                            await NotificationCollection.insertMany(notifications)
                        ).insertedIds;
                    }
                    await GlobalUsersCollection.insertOne({
                        ...user,
                        notifications: Object.values(notificationIds),
                        _partition: "global"
                    })


                });
                logger.info(
                    `Done migration of Notification and Users.`
                );
                resolve(true)
            }
        } catch (e) {
            reject(e)
        }
    })
}

export default MigrateGlobalUserAndNotification;