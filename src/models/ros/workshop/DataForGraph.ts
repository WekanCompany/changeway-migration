export type DataForGraphType = {
	id: string,
	xDataLabels?: string[],
	data1: number[],
	data2: number[],
	data3: number[],
	data4: number[],
	data5: number[]
}
export const DataForGraph = {
	name: "DataForGraph",
	primaryKey: "id",
	properties: {
		id: "string",
		xDataLabels: "string?[]",
		data1: "float[]",
		data2: "float[]",
		data3: "float[]",
		data4: "float[]",
		data5: "float[]"
	}
};