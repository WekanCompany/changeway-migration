import { ZoneLinkerType } from "./ZoneLinker";

export type TemplateLinkerType = {
	templateLinkerId: string,
	dataFromTemplates?: string[],
	zoneLinker: ZoneLinkerType[]
}

export const TemplateLinker = {
	name: "TemplateLinker",
	primaryKey: "templateLinkerId",
	properties: {
		templateLinkerId: "string",
		dataFromTemplates: "string?[]",
		zoneLinker: "ZoneLinker[]"
	}
};