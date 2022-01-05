import { BoardRowType } from "./BoardRow";
import { BoardSettingsType } from "./BoardSettings";

export type BoardTableType = {
	tableId: string,
	name: string,
	order: number,
	information?: string,
	numberOfHeadings: number,
	headings: string[],
	rows: BoardRowType[],
	settings: BoardSettingsType[],
	predefinedObject?: string[]
}

export const BoardTable = {
	name: "BoardTable",
	primaryKey: "tableId",
	properties: {
		tableId: "string",
		name: "string",
		order: "int",
		information: "string?",
		numberOfHeadings: "int",
		headings: "string[]",
		rows: "BoardRow[]",
		settings: "BoardSettings[]",
		predefinedObject: "string?[]"
	}
};