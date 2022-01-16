import { ParticipantType } from "../common/Participant";

export type EverydayBoardType = {
    _id: string;
    boardName: string;
    level: string;
    everydayBoardList?: string[];
    associatedBoards?: string[];
    participants: ParticipantType[];
    dimensionListIds?: string[];
    locked:boolean;
    inTree: boolean;
}

export const EverydayBoard = {
	name: "EverydayBoard",
	primaryKey: "_id",
	properties: {
		_id: "string",
		boardName: "string",
		level: "int",
		everydayBoardList: "string?[]",
		associatedBoards: "string?[]",
		participants: "Participant[]",
		dimensionListIds: "string?[]",
		locked: { type: "bool", default: false },
		inTree: { type: "bool", default: false }
	}
};