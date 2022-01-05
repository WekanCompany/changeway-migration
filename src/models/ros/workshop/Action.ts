import { GoalType } from "../common/Goal";
import { WorkshopParticipantType } from "./WorkshopPartitipant"

export type ActionType = {
	actionId: string,
	type: string,
	action: string,
	actionDescription: string,
	dueDate: Date,
	assignees: WorkshopParticipantType[],
	complete: boolean,
	responded: boolean,
	response: string,
	respondReason?: string,
	suggestedChange?: string,
	suggestedGoal?: GoalType,
	primaryGoal: any,
	secondaryGoal: any
}
export const Action = {
	name: "Action",
	primaryKey: "actionId",
	properties: {
		actionId: "string",
		type: "string",
		action: "string",
		actionDescription: "string",
		dueDate: "date",
		assignees: "Participant[]",
		complete: "bool",
		responded: { type: "bool", default: false },
		response: { type: "string", default: "b-pending" },
		respondReason: "string?",
		suggestedChange: "string?",
		suggestedGoal: "Goal",
		primaryGoal: {
			type: "linkingObjects",
			objectType: "XMatrixGoal",
			property: "primary"
		},
		secondaryGoal: {
			type: "linkingObjects",
			objectType: "XMatrixGoal",
			property: "secondary"
		}
	}
};
