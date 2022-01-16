export type ConfigType = {
	_id: string,
	configName: string,
	configValue: string
}

export const Config = {
	name: "Config",
	primaryKey: "_id",
	properties: {
		_id: "string",
		configName: "string",
		configValue: "string"
	}
};