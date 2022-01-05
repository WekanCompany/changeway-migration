import { RowType } from "./Row";

export type TableType = {
	tableId: string,
	title: string,
	rows: RowType
}

export const Table = {
	name: "Table",
	primaryKey: "tableId",
	properties: {
		tableId: "string",
		title: "string",
		rows: "Row[]"
	}
};