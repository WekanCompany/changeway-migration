import { BoardCardType } from "./BoardCard";

export type GeneralType = {
	generalId: string,
	title: string,
	card: BoardCardType
}
export const General = {
	name: "General",
	primaryKey: "generalId",
	properties: {
		generalId: "string",
		title: "string",
		card: "BoardCard"
	}
};