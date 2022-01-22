import { DimensionType } from "./Dimension";
import { EverydayBoardType } from "./EverydayBoard";
import { MissIssueType } from "./MissIssue";

export type MonthlyDataType = {
	_id: string,
	plan: number,
	actual: number,
	delta: number,
	targetEntryCount: number,
	currentEntryCount: number,
	totalEntryCount: number,
	dimension: DimensionType,
	date: Date,
	everydayId: EverydayBoardType,
	// missIssue: MissIssueType
}
export const MonthlyData = {
	name: "MonthlyData",
	primaryKey: "_id",
	properties: {
		_id: "string",
		plan: "float",
		actual: "float",
		delta: "float",
		targetEntryCount: "int",
		currentEntryCount: "int",
		totalEntryCount: "int",
		dimension: "Dimension",
		date: "date",
		everydayId: "EverydayBoard",
		// missIssue: "MissIssue"
	}
};