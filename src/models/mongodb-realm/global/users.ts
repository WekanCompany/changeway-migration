import { N_NotificationType } from "./notifications";

export type N_GlobalUserType = {
    _id: any,
	_partition:string,
	emailId: string,
	fcmToken: [string],
	name?: string,
	profilePic?: string,
	notifications: N_NotificationType[]
}