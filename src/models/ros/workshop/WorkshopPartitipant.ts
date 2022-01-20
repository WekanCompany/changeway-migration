import { ParticipantType } from "../common/Participant";
import { ActionType } from "./Action";

export type WorkshopParticipantType = ParticipantType & {
	actions: ActionType[],
	xMatrices: any
}

export const WorkshopParticipant = {
	name: "Participant",
	primaryKey: "email",
	properties: {
		id: "string?",
		email: "string",
		identity: "string?",
		picture: "string?",
		companyType: "string",
		role: "string",
		location: "string?",
		status: "string",
		firstname: "string",
		surname: "string",
		online: { type: "bool", default: false },
		unlock: { type: "bool", default: false },
		actions: "Action[]",
		// xMatrices: {
		// 	type: "linkingObjects",
		// 	objectType: "XMatrix",
		// 	property: "participantList"
		// }
	}
};