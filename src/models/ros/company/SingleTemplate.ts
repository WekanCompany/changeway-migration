import { LabelType } from "../common/Label";
import { MagnetType } from "../common/Magnet";
import { TemplateMetaDataType } from "../common/TemplateMetadata";
import { TemplateDataType } from "./TemplateData";

export type SingleTemplateType = {
	singleTemplateId: string,
	title: string,
	templateMetadata: TemplateDataType | any,
	order: number,
	deleted: boolean,
	templateId?: string|null,
	magnets: MagnetType[],
	realmUrl: string,
	labels: LabelType[]
}

export const SingleTemplate = {
	name: "SingleTemplatee",
	primaryKey: "singleTemplateId",
	properties: {
		singleTemplateId: "string",
		title: "string?",
		templateMetadata: "TemplateMetadata",
		order: "int?",
		deleted: { type: "bool", default: false },
		templateId: "string?",
		magnets: "Magnet[]",
		realmUrl: "string",
		labels: "Label[]"
	}
};