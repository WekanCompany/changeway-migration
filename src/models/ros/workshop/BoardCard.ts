import { BoardSettingsType } from "./BoardSettings";

export type BoardCardType = {
	cardId: string,
	linkId?: string,
	type: string,
	order: number,
	icon?: string,
	passedIn: boolean,
	settings: BoardSettingsType
}

export const BoardCard = {
	name: "BoardCard",
	primaryKey: "cardId",
	properties: {
		cardId: "string",
		linkId: "string?",
		type: "string",
		order: "int",
		icon: "string?",
		passedIn: { type: "bool", default: false },
		settings: "BoardSettings"
	}
};