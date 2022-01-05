export type BoardCellType = {
	cellId: string,
	linkId?: string,
	type: string,
	columnNumber: number
}

export const BoardCell = {
	name: "BoardCell",
	primaryKey: "cellId",
	properties: {
		cellId: "string",
		linkId: "string?",
		type: "string",
		columnNumber: "int"
	}
};