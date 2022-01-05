export type AxisPointType = {
	axisPointId: string,
	title?: string,
	alignment?: string,
	colour?: string
}
export const AxisPoint = {
	name: "AxisPoint",
	primaryKey: "axisPointId",
	properties: {
		axisPointId: "string",
		title: "string?",
		alignment: "string?",
		colour: "string?"
	}
};