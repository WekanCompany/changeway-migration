
export type SettingType = {
	id: string,
	type: string,
	setting: string
}


export const Setting = {
	name: "Setting",
	primaryKey: "id",
	properties: {
		id: "string",
		type: "string",
		setting: "string"
	}
};
