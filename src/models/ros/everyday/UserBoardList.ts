import { EverydayBoardType } from "./EverydayBoard";

export type UserBoardListType = {
    _id: string,
    userId: string,
    myBoardsList: EverydayBoardType[]
}

export const UserBoardList = {
	name: "UserBoardList",
	primaryKey: "_id",
	properties: {
		_id: "string",
		userId: "string",
		myBoardsList: "EverydayBoard[]"
	}
};