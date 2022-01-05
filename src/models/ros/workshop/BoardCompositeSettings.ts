import { BoardCompositeCardTypeSettingsType } from "./BoardCompositeCardTypeSettings";

export type BoardCompositeSettingsType = {
	boardCompositeSettingsId: string,
	title: string,
	cards: BoardCompositeCardTypeSettingsType[]
}
export const BoardCompositeSettings = {
	name: "BoardCompositeSettings",
	primaryKey: "boardCompositeSettingsId",
	properties: {
		boardCompositeSettingsId: "string",
		title: "string",
		cards: "BoardCompositeCardTypeSettings[]"
	}
};