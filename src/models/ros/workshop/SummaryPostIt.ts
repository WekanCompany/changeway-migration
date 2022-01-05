export type SummaryPostItType = {
	postItId: string,
	owner: string,
	type: string,
	x: number,
	y: number,
	value: string,
	state: string,
	zoneId: string,
	flowTable?: number[],
	magnetTable?: number[],
	derivationTable?: number[],
	visible: boolean,
	deleted: boolean,
	showInSummary: boolean,
	cardId?: string
}

export const SummaryPostIt = {
	name: "SummaryPostIt",
	primaryKey: "postItId",
	properties: {
		postItId: "string",
		owner: "string",
		type: "string",
		x: "double",
		y: "double",
		value: "string",
		state: "string",
		zoneId: "string",
		flowTable: "double?[]",
		magnetTable: "double?[]",
		derivationTable: "double?[]",
		visible: "bool",
		deleted: "bool",
		showInSummary: "bool",
		cardId: "string?"
	}
};
