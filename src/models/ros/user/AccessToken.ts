export type AccessTokenType = {
	id: string,
	theToken: string
}


export const AccessToken = {
	name: "AccessToken",
	primaryKey: "id",
	properties: {
		id: "string",
		theToken: "string"
	}
};