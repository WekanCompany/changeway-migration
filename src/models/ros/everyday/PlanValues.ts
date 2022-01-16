import { DimensionType } from "./Dimension";

export type PlanValuesType = {
	_id: string,
	dimension: DimensionType,
	hour: number,
	values: number
}

export const PlanValues = {
	name: "PlanValues",
	primaryKey: "_id",
	properties: {
		_id: "string",
		dimension: "Dimension",
		hour: "int",
		values: "float"
	}
};
