import { DataForBoxType } from "./DataForBox";

export type DataBoxType = {
	dataBoxId: string,
	title: string,
	rowsForBox: DataForBoxType[],
	editors: string[]

}
export const DataBox = {
	name: "DataBox",
	primaryKey: "dataBoxId",
	properties: {
		dataBoxId: "string",
		title: "string?",
		rowsForBox: "DataForBox[]",
		editors: "string[]"
	}
};