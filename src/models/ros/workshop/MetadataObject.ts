
export type MetadataObjectType = {
	objectId: string,
	type: string,
	title?: string,
	createdBy?: string,
	dateCreated: Date,
	dateDeleted: Date
}


export const MetadataObject = {
	name: "MetadataObject",
	primaryKey: "objectId",
	properties: {
		objectId: "string",
		type: "string",
		title: "string?",
		createdBy: "string?",
		dateCreated: "date?",
		dateDeleted: "date?"
	}
};