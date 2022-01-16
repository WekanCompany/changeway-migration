import { DimensionType } from "./Dimension";
import { EverydayBoardType } from "./EverydayBoard";
import { MissIssueType } from "./MissIssue";
import { MissReasonType } from "./MissReason";
import { ReasonForMissType } from "./ReasonForMiss";

export type DailyDataType = {
	_id: string,
	hour: number,
	label: string,
	plan: number,
	actual: number,
	delta: number,
	missedDueTo: string,
	dimension: DimensionType,
	date: Date,
	missReasonId: MissReasonType,
	everydayId: EverydayBoardType,
	reasonForMiss: ReasonForMissType[],
	missIssue: MissIssueType,
	lastUpdatedBy?: string
}

export const DailyData = {
	name: "DailyData",
	primaryKey: "_id",
	properties: {
		_id: "string",
		hour: "int",
		label: "string",
		plan: "float",
		actual: "float",
		delta: "float",
		missedDueTo: "string",
		dimension: "Dimension",
		date: "date",
		missReasonId: "MissReason",
		everydayId: "EverydayBoard",
		reasonForMiss: "ReasonForMiss[]",
		missIssue: "MissIssue",
		lastUpdatedBy: "string?"
	}
};