export type SettingsType = {
	settingsId: string,
	measureSeeSay: boolean,
	addZones: boolean
}

export const Settings = {
	name: "Settings",
	primaryKey: "settingsId",
	properties: {
		settingsId: "string",
		measureSeeSay: "bool",
		addZones: "bool"
	}
};
