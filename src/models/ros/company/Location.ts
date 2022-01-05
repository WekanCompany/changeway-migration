
export type LocationType = {
	locationId: string;
    streetNumber: string;
    streetLine: string;
    addressLine2: string;
    postCodeLine: string;
    cityLine: string;
    country: string;
    locationName: string;
    language: string;
    currency: string;
    meetingRooms: string[];
}

export const Location = {
	name: "Location",
	primaryKey: "locationId",
	properties: {
		locationId: "string",
		streetNumber: "string?",
		streetLine: "string?",
		addressLine2: "string?",
		postCodeLine: "string?",
		cityLine: "string?",
		country: "string",
		locationName: "string",
		language: "string",
		currency: "string",
		meetingRooms: "string?[]"
	}
};
