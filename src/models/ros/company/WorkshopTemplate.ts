import { FileType } from "../common/File";
import { LabelType } from "../common/Label";
import { MagnetType } from "../common/Magnet";
import { TemplateMetaDataType } from "../common/TemplateMetadata";

export type WorkshopTemplateType = {
	workshopTemplateId: string;
	title: string;
	order: number;
	deleted: boolean;
	files: FileType[];
	workshopId: string;
	magnets: MagnetType[];
	realmUrl: string;
	templates: TemplateMetaDataType[];
	labels: LabelType[];
}

export const WorkshopTemplate = {
	name: "WorkshopTemplate",
	primaryKey: "workshopTemplateId",
	properties: {
		workshopTemplateId: "string",
		title: "string?",
		order: "int?",
		deleted: { type: "bool", default: false },
		files: "File[]",
		workshopId: "string?",
		magnets: "Magnet[]",
		realmUrl: "string",
		// templates: "TemplateMetadata[]?",
		labels: "Label[]"
	}
};