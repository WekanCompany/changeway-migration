export type SettingsMetadataType = {
    settingsMetadataId: string,
    variable: string,
    default: string,
    value: string
}
export const SettingsMetadata = {
    name: "SettingsMetadata",
    primaryKey: "settingsMetadataId",
    properties: {
        settingsMetadataId: "string",
        variable: "string",
        default: "string",
        value: "string"
    }
};
