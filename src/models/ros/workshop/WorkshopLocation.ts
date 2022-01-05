
export type WorkshopLocationType = {
	workshopLocationId: string,
	meetingRoom?: string,
	locationName?: string,
	streetNumber?: string,
	streetLine?: string,
	addressLine2?: string,
	postCodeLine?: string,
	cityLine?: string,
	country?: string
}
export const WorkshopLocation = {
	name: "WorkshopLocation",
	primaryKey: "workshopLocationId",
	properties: {
		workshopLocationId: "string",
		meetingRoom: "string?",
		locationName: "string?",
		streetNumber: "string?",
		streetLine: "string?",
		addressLine2: "string?",
		postCodeLine: "string?",
		cityLine: "string?",
		country: "string?"
	}
};
