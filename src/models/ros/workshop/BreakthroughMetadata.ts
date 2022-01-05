import { SettingsMetadataType } from "../common/SettingsMetadata";

export type BreakthroughMetadataType = {
	breakthroughMetadataId: string,
	level0Metadata: SettingsMetadataType[],
	level1Metadata: SettingsMetadataType[],
	generalMetadata: SettingsMetadataType[]
}
export const BreakthroughMetadata = {
	name: "BreakthroughMetadata",
	primaryKey: "breakthroughMetadataId",
	properties: {
		breakthroughMetadataId: "string",
		level0Metadata: "SettingsMetadata[]",
		level1Metadata: "SettingsMetadata[]",
		generalMetadata: "SettingsMetadata[]"
	}
};