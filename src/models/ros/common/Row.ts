import { DataType } from "./Data";

export type RowType = {
	rowId: string,
	metricGroup?: string,
	metric: string,
	title: string,
	value: DataType[],
	unitsGroup?: string,
	units: string,
	useSuffix: boolean,
	chosenSuffix: string
}
export const Row = {
	name: "Row",
	primaryKey: "rowId",
	properties: {
		rowId: "string",
		metricGroup: "string?",
		metric: "string?",
		title: "string",
		value: "Data[]",
		unitsGroup: "string?",
		units: "string",
		useSuffix: { type: "bool", default: false },
		chosenSuffix: "string?"
	}
};