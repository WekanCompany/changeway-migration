export type DataForBoxType = {
	dataForBoxId: string,
	data: string[]
}
export const DataForBox = {
	name: "DataForBox",
	primaryKey: "dataForBoxId",
	properties: {
		dataForBoxId: "string",
		data: "string?[]"
	}
};
