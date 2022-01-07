import { BoardCardType } from "./BoardCard";
import { BoardSettingsType } from "./BoardSettings";
import { BoardZoneLinkType } from "./BoardZoneLink";

export type BoardZoneType = {
	zoneId: string,
	name: string,
	description?: string,
	order: number,
	information?: string,
	cards: BoardCardType[],
	settings: BoardSettingsType | any,
	singleFavourite: boolean,
	singleBrainstorm: boolean,
	linkages: BoardZoneLinkType[]|any,
	generated:boolean,
	deleted: boolean
}

export const BoardZone = {
	name: "BoardZone",
	primaryKey: "zoneId",
	properties: {
		zoneId: "string",
		name: "string",
		description: "string?",
		order: "int",
		information: "string?",
		cards: "BoardCard[]",
		settings: "BoardSettings",
		singleFavourite: "bool?",
		singleBrainstorm: "bool?",
		linkages: "BoardZoneLink[]",
		generated: { type: "bool", default: false },
		deleted: { type: "bool", default: false }
	}
};
