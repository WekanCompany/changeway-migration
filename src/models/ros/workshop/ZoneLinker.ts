export type ZoneLinkerType = {
	zoneLinkerId: string;
    zonesFrom?: string[];
    zonesTo?: string[];
    whatData?: string[];
}

export const ZoneLinker = {
	name: "ZoneLinker",
	primaryKey: "zoneLinkerId",
	properties: {
		zoneLinkerId: "string",
		zonesFrom: "string?[]",
		zonesTo: "string?[]",
		whatData: "string?[]"
	}
};