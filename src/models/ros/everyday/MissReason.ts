import { DimensionType } from "./Dimension";

export type MissReasonType = {
	_id: string,
	dimension: DimensionType,
	title: string,
	isActive: boolean,
	createdAt: Date,
	deletedAt: Date,
	deletedBy: string
}

export const MissReason = {
	name: "MissReason",
	primaryKey: "_id",
	properties: {
		_id: "string",
		dimension: "Dimension",
		title: "string",
		isActive: "bool",
		createdAt: "date",
		deletedAt: "date",
		deletedBy: "string"
	}
};