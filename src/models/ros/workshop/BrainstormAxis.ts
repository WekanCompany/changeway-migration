import { AxisType } from "./Axis";

export type BrainstormAxisType = {
	brainstormAxisId: string,
	xAxis: AxisType[],
	yAxis: AxisType[]
}
export const BrainstormAxis = {
	name: "BrainstormAxis",
	primaryKey: "brainstormAxisId",
	properties: {
		brainstormAxisId: "string",
		xAxis: "Axis[]",
		yAxis: "Axis[]"
	}
};
