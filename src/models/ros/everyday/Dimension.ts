import { ParticipantType } from "../common/Participant";

export type DimensionType = {
	_id: string,
	dimensionId: string,
	name: string,
	displayLetter: string,
	dimensionType: string,
	boardId?: string,
	metricGroup: string,
	metric: string,
	unitsGroup: string,
	unit: string,
	kpi: string,
	suffix: string,
	intervalOfControl: string,
	maxRedLimit: number,
	minGreenLimit: number,
	isAmberEnabled: boolean,
	includeRedInLimit: boolean,
	dimensionOrder: number,
	creationDate: Date,
	updatedDate?: Date,
	isDefault: boolean,
	improvementDirection: string,
	calculationType: string,
	dimensionOwner?: ParticipantType,
	isActive: boolean
}
export const Dimension = {
	name: "Dimension",
	primaryKey: "_id",
	properties: {
		_id: "string",
		dimensionId: "string",
		name: "string",
		displayLetter: "string",
		dimensionType: "string",
		boardId: "string?",
		metricGroup: "string",
		metric: "string",
		unitsGroup: "string",
		unit: "string",
		kpi: "string",
		suffix: "string",
		intervalOfControl: "string",
		maxRedLimit: { type: "int", default: 100 },
		minGreenLimit: { type: "int", default: 100 },
		isAmberEnabled: { type: "bool", default: false },
		includeRedInLimit: { type: "bool", default: false },
		dimensionOrder: { type: "int", default: 0 },
		creationDate: "date",
		updatedDate: "date?",
		isDefault: "bool",
		improvementDirection: "string",
		calculationType: { type: "string", default: "" },
		dimensionOwner: "Participant?",
		isActive: "bool"
	}
};
