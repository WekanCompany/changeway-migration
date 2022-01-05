import { GoalType } from "../common/Goal";
import { BrainstormAxisType } from "./BrainstormAxis";
import { PostItType } from "./PostIt";
import { SummaryPostItType } from "./SummaryPostIt";
import { ZoneType } from "./Zone";

export type BrainstormType = {
	brainstormId: string,
		title?: string,
		xLength: number,
		yLength: number,
		postIts: PostItType[],
		summaryPostIts: SummaryPostItType[],
		goals: GoalType[],
		zones: ZoneType[],
		duplication: boolean,
		allowGoalObject: boolean,
		uploadInProgress?: boolean,
		userUploading?: string,
		type?: string,
		locked:boolean,
		lockedAllowZoom:boolean,
		lockedAllowPostIt: boolean,
		lockedAllowPostItCreation: boolean,
		priorityByZone:boolean,
		axis: BrainstormAxisType[],
		columns: number,
		rows: number,
		gridSize: number,
		rowTitles: string[],
		columnTitles: string[],
		gridLineType?: string,
		gridHasTitle: boolean
}


export const Brainstorm = {
	name: "Brainstorm",
	primaryKey: "brainstormId",
	properties: {
		brainstormId: "string",
		title: "string?",
		xLength: "int",
		yLength: "int",
		postIts: "PostIt[]",
		summaryPostIts: "SummaryPostIt[]",
		goals: "Goal[]",
		zones: "Zone[]",
		duplication: "bool",
		allowGoalObject: "bool",
		uploadInProgress: "bool?",
		userUploading: "string?",
		type: "string?",
		locked: { type: "bool", default: false },
		lockedAllowZoom: { type: "bool", default: false },
		lockedAllowPostIt: { type: "bool", default: true },
		lockedAllowPostItCreation: { type: "bool", default: true },
		priorityByZone: { type: "bool", default: false },
		axis: "BrainstormAxis[]",
		columns: { type: "int", default: 0 },
		rows: { type: "int", default: 0 },
		gridSize: { type: "string", default: "" },
		rowTitles: "string[]",
		columnTitles: "string[]",
		gridLineType: { type: "string?", default: "solid" },
		gridHasTitle: { type: "bool?", default: true }
	}
};