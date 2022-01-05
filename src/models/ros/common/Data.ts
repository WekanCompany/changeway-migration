export type DataType = {
	dataId: string,
	dataValue?: number
}
export const Data = {
	name: "Data",
	primaryKey: "dataId",
	properties: {
		dataId: "string",
		dataValue: "double?"
	}
};