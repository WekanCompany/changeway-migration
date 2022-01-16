import { PlanValuesType } from "./PlanValues";

export type PlanType = {
	_id: string,
	planValues: PlanValuesType[],
	dimensionId: string,
	boardId: string,
	planId: string,
	planData?: number[],
	default: boolean,
	createdDate: Date,
	updatedDate?: Date
}


export const Plan = {
	name: "Plan",
	primaryKey: "_id",
	properties: {
		_id: "string",
		planValues: "PlanValues[]",
		dimensionId: "string",
		boardId: "string",
		planId: "string",
		planData: "float?[]",
		default: { type: "bool", default: true },
		createdDate: "date",
		updatedDate: "date?"
	}
};
