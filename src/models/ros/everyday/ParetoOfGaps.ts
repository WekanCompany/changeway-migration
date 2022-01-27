import { FileType } from "../common/File";
import { CommentType } from "../workshop/Comment";
import { DimensionType } from "./Dimension";
import { MissIssueType } from "./MissIssue";
import { MissReasonType } from "./MissReason";

export type ParetoOfGapsType = {
	_id: string,
		missCount: number,
		dimension: DimensionType,
		missReason: MissReasonType,
		month: string,
		year: string,
		everydayId: string,
		totalLostTime: number,
		lostTimeDataFormat: string,
		missIssue: MissIssueType,
		issue: string | null,
		attachments: FileType[],
		comments: CommentType[],
		percentFreq: number,
		percentLostTime: number,
		issueUUID:any

}

export const ParetoOfGaps = {
	name: "ParetoOfGaps",
	primaryKey: "_id",
	properties: {
		_id: "string",
		missCount: "int",
		dimension: "Dimension",
		missReason: "MissReason",
		month: "string",
		year: "string",
		everydayId: "string",
		totalLostTime: "float",
		lostTimeDataFormat: "string",
		missIssue: "MissIssue",
		issue: "string",
		attachments: "File[]",
		comments: "Comment[]",
		percentFreq: { type: "double", default: 0.0 },
		percentLostTime: { type: "double", default: 0.0 }
	}
};
