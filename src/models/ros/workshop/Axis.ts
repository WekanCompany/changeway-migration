import { AxisPointType } from "./AxisPoint";

export type AxisType = {
	axisId: string,
	position: string,
	titles: string[],
	points: AxisPointType[]
}
export const Axis = {
	name: "Axis",
	primaryKey: "axisId",
	properties: {
		axisId: "string",
		position: "string",
		titles: "string[]",
		points: "AxisPoint[]"
	}
};