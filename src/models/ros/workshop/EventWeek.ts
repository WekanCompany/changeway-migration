import { BoardZoneLinkType } from "./BoardZoneLink";
import { EventTaskType } from "./EventTask";

export type EventWeekType = {
	zoneId: string,
	name: string,
	cards: EventTaskType[],
	complete: string,
	order: number,
	information?: string,
	deleted: boolean,
	preventCreation: boolean,
	linkages: BoardZoneLinkType[]| any
}
export const EventWeek = {
	name: "EventWeek",
	primaryKey: "zoneId",
	properties: {
		zoneId: "string",
		name: "string",
		cards: "EventTask[]",
		complete: "string",
		order: "int",
		information: "string?",
		deleted: { type: "bool", default: false },
		preventCreation: { type: "bool", default: false },
		linkages: "BoardZoneLink[]"
	}
};