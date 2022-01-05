import { FileType } from "../common/File";
import { LabelType } from "../common/Label";
import { CommentType } from "./Comment";
import { WorkshopParticipantType } from "./WorkshopPartitipant";

export type EventTaskType = {
	cardId: string,
		task: string,
		people: WorkshopParticipantType,
		assignees: WorkshopParticipantType[],
		dueDate: Date,
		complete:boolean,
		order: number,
		type: string,
		icon: string,
		description?: string,
		issueDescription?: string,
		is3cMethod: boolean,
		cause?: string,
		counterMeasure?: string,
		correctiveAction?: string,
		obstacle?: string,
		updatedAt?: Date,
		createdAt?: Date,
		lastUpdatedBy?: string,
		createdBy?: string,
		completionStatus: number,
		completionColor?: string,
		comments: CommentType[],
		attachments: FileType[],
		isDeleted: boolean,
		passedIn: boolean,
		isEscalated: boolean,
		refNumber?: number,
		labels: LabelType[],
		issueType:string
}
export const EventTask = {
	name: "EventTask",
	primaryKey: "cardId",
	properties: {
		cardId: "string",
		task: "string",
		people: "Participant",
		assignees: "Participant[]",
		dueDate: "date",
		complete: { type: "bool", default: false },
		order: "int",
		type: "string",
		icon: "string",
		description: "string?",
		issueDescription: "string?",
		is3cMethod: { type: "bool", default: false },
		cause: "string?",
		counterMeasure: "string?",
		correctiveAction: "string?",
		obstacle: "string?",
		updatedAt: "date?",
		createdAt: "date?",
		lastUpdatedBy: "string?",
		createdBy: "string?",
		completionStatus: { type: "int?", default: 0 },
		completionColor: "string?",
		comments: "Comment[]",
		attachments: "File[]",
		isDeleted: { type: "bool", default: false },
		passedIn: { type: "bool", default: false },
		isEscalated: { type: "bool", default: false },
		refNumber: "int?",
		labels: "Label[]",
		issueType: { type: "string", default: "Template" }
	}
};