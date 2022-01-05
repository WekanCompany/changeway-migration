import { BoardZoneType } from "./BoardZone";

export type BoardColumnType = {
	columnId: string,
	order: number,
	zones: BoardZoneType[]
}

export const BoardColumn = {
	name: "BoardColumn",
	primaryKey: "columnId",
	properties: {
		columnId: "string",
		order: "int",
		zones: "BoardZone[]"
	}
};