import { EventWeekType } from "./EventWeek";

export type PreEventChecklistType = {
	id: string,
	zones: EventWeekType[]
}

export const PreEventChecklist = {
	name: "PreEventChecklist",
	primaryKey: "id",
	properties: {
		id: "string",
		zones: "EventWeek[]"
	}
};