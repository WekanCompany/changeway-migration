import { FileType } from "../common/File";
import { CommentType } from "../workshop/Comment";
import { DimensionType } from "./Dimension";
import { EverydayBoardType } from "./EverydayBoard";
import { MissReasonType } from "./MissReason";

export type ReasonForMissType = {
	_id: string,
		missReasonId: string,
		missReason: MissReasonType,
		reason: string,
		dimension: DimensionType,
		everydayId: EverydayBoardType,
		lostTime: number,
		lostTimeInDays?: number,
		lostTimeInHours?: number,
		lostTimeInMinutes?: number,
		lostTimeInSeconds?:number,
		lostTimeDataFormat: string,
		attachments: FileType[],
		comments: CommentType[],
		issue: string,
		dailyData: any
}

export const ReasonForMiss = {
	name: "ReasonForMiss",
	primaryKey: "_id",
	properties: {
		_id: "string",
		missReasonId: "string",
		missReason: "MissReason",
		reason: "string",
		dimension: "Dimension",
		everydayId: "EverydayBoard",
		lostTime: "float",
		lostTimeInDays: "int?",
		lostTimeInHours: "int?",
		lostTimeInMinutes: "int?",
		lostTimeInSeconds: "int?",
		lostTimeDataFormat: "string",
		attachments: "File[]",
		comments: "Comment[]",
		issue: "string",
		// dailyData: {
		// 	type: "linkingObjects",
		// 	objectType: "DailyData",
		// 	property: "reasonForMiss"
		// }
	}
};