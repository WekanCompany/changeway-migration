import { BoardCompositeSettingsType } from "./BoardCompositeSettings";
import { BoardZoneType } from "./BoardZone";

export type BoardZoneLinkType = {
	boardZoneLinkId: string,
	cardType: string,
	newType: string,
	composite: BoardCompositeSettingsType,
	zone: BoardZoneType
}

export const BoardZoneLink = {
	name: "BoardZoneLink",
	primaryKey: "boardZoneLinkId",
	properties: {
		boardZoneLinkId: "string",
		cardType: "string",
		newType: "string",
		composite: "BoardCompositeSettings",
		zone: "BoardZone"
	}
};
