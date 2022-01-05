import { BoardColumnType } from "./BoardColumn";
import { BoardTableType } from "./BoardTable";
import { PreEventChecklistType } from "./PreEventChecklist";

export type BoardType = {
	boardId: string,
	columns: BoardColumnType[],
	tables: BoardTableType[],
	checklist: PreEventChecklistType[] // for new action plan
}

export const Board = {
	name: "Board",
	primaryKey: "boardId",
	properties: {
		boardId: "string",
		columns: "BoardColumn[]",
		tables: "BoardTable[]",
		checklist: "PreEventChecklist[]" // for new action plan
	}
};
