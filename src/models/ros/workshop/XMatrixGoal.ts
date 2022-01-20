import { GoalType } from "../common/Goal";
import { ActionType } from "./Action";
import { MajorMinorType } from "./MajorMinor";

export type XMatrixGoalType = {
	xMatrixGoalId: string;
    sentence: string;
    goal: GoalType;
    priority: number;
    majorMinors: MajorMinorType[];
    primary: ActionType;
    secondary: ActionType[];
    triangle: any;
    linkageStatus: boolean;
    goalUsedInCretionOfL1: boolean;
}
export const XMatrixGoal = {
	name: "XMatrixGoal",
	primaryKey: "xMatrixGoalId",
	properties: {
		xMatrixGoalId: "string",
		sentence: "string",
		goal: "Goal",
		priority: "int",
		majorMinors: "MajorMinor[]",
		primary: "Action",
		secondary: "Action[]",
		// triangle: {
		// 	type: "linkingObjects",
		// 	objectType: "XMatrixTriangle",
		// 	property: "goals"
		// },
		linkageStatus: { type: "bool?", default: false },
		goalUsedInCretionOfL1: { type: "bool", default: false } // For checking that Enterprise Improvement Priorities is used in other Level 1 X-Matrix
	}
};