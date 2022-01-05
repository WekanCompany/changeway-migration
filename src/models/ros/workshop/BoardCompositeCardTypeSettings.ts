
export type BoardCompositeCardTypeSettingsType = {
	boardCompositeCardTypeId: string,
	title: string,
	type: string,
	generalTypes: string[],
	linked: boolean
}
export const BoardCompositeCardTypeSettings = {
	name: "BoardCompositeCardTypeSettings",
	primaryKey: "boardCompositeCardTypeId",
	properties: {
		boardCompositeCardTypeId: "string",
		title: "string",
		type: "string",
		generalTypes: "string[]",
		linked: { type: "bool", default: false }
	}
};