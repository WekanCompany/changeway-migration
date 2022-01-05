import { ReactionType } from "./Reaction";
import { WorkshopParticipantType } from "./WorkshopPartitipant";

export type CommentType = {
	id: string,
	commentId: string,
	userCommented: WorkshopParticipantType,
	taskId: string,
	comment: string,
	replies: CommentType[],
	mentions: WorkshopParticipantType[],
	emoticons: ReactionType[],
	updatedAt: Date,
	createdAt: Date,
	isReply: boolean,
	isDeleted: boolean
}
export const Comment = {
	name: "Comment",
	primaryKey: "commentId",
	properties: {
		id: "string",
		commentId: "string",
		// associatedCommentId: { type: "string?", default: null },
		userCommented: "Participant",
		taskId: "string",
		comment: "string",
		replies: "Comment[]",
		mentions: "Participant[]",
		emoticons: "Reaction[]",
		updatedAt: "date?",
		createdAt: "date?",
		isReply: { type: "bool", default: false },
		isDeleted: { type: "bool", default: false }
	}
};