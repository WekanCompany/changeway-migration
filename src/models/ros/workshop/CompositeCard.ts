import { BoardCardType } from "./BoardCard";

export type CompositeCardType = {
	compositeId: string,
	linkId?: string|null,
	type: string,
	title: string,
	editors: string[],
	cards: BoardCardType[]
}
export const CompositeCard = {
	name: "CompositeCard",
	primaryKey: "compositeId",
	properties: {
		compositeId: "string",
		linkId: "string",
		type: "string",
		title: "string",
		editors: "string[]",
		cards: "BoardCard[]"
	}
};
