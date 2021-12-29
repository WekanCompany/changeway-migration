
export type WorkshopType = {
	workshopId: string,
	url: string,
	name: string,
	status: string,
	startDate: Date,
	endDate: Date,
	application: string,
	isCreatedUsingWalkthrough?: boolean
}


export const Workshop = {
	name: "Workshop",
	primaryKey: "workshopId",
	properties: {
		workshopId: "string",
		url: "string",
		name: "string",
		status: "string",
		startDate: "date",
		endDate: "date",
		application: "string",
		isCreatedUsingWalkthrough: "bool?"
	}
};