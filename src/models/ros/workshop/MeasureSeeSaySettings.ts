
export type MeasureSeeSaySettingsType = {
	measureSeeSaySettingsId: string,
	measure?: string[],
	see?: string[],
	say?: string[]
}
export const MeasureSeeSaySettings = {
	name: "MeasureSeeSaySettings",
	primaryKey: "measureSeeSaySettingsId",
	properties: {
		measureSeeSaySettingsId: "string",
		measure: "string?[]",
		see: "string?[]",
		say: "string?[]"
	}
};