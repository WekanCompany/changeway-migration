export type TextGoalType = {
	textGoalId: string,
	value: string,
	aim: string,
	comment: string,
	progress: string,
	goalStatus: string,
	achieved: boolean,
	currentValue?: string[],
	dateValueChanged?: Date[],
	userThatChanged?: string[],
	reason?: string[],
	dataSource?: string[],
	editors: string[],
	isThinking: boolean
}
export const TextGoal = {
	name: "TextGoal",
	primaryKey: "textGoalId",
	properties: {
		textGoalId: "string",
		value: "string",
		aim: "string",
		comment: "string",
		progress: "string",
		goalStatus: { type: "string?" },
		achieved: "bool",
		currentValue: "string?[]",
		dateValueChanged: "date?[]",
		userThatChanged: "string?[]",
		reason: "string?[]",
		dataSource: "string?[]",
		editors: "string[]",
		isThinking: { type: "bool?", default: false }
	}
};
