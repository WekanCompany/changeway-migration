import { WorkshopParticipantType } from "./WorkshopPartitipant";

export type ReactionType = {
	id: string,
	reactionId: string,
	type: string,
	participant: WorkshopParticipantType,
	isDeleted: boolean
}
export const Reaction = {
	name: "Reaction",
	primaryKey: "reactionId",
	properties: {
		id: "string",
		reactionId: "string",
		type: "string",
		participant: "Participant",
		isDeleted: { type: "bool", default: false }
	}
};