import { NotificationType } from "./notifications";

export type GlobalUserType = {
	emailId: string,
	fcmToken: [string],
	name: string,
	profilePic: string,
	notifications: NotificationType[]
}


export const GlobalUser = {
	name: "GlobalUser",
	primaryKey: "emailId",
	properties: {
		emailId: "string",
		fcmToken: "string?[]",
		name: "string?",
		profilePic: "string?",
		notifications: "Notifications[]"
	}
};

export default GlobalUser;