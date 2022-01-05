import { BoardCellType } from "./BoardCell";

export type BoardRowType = {
	rowId: string,
	order: number,
	cells: BoardCellType[],
	actionId?: string
}

export const BoardRow = {
	name: "BoardRow",
	primaryKey: "rowId",
	properties: {
		rowId: "string",
		order: "int",
		cells: "BoardCell[]",
		actionId: "string?"
	}
};