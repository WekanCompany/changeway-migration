import { FileType } from "../common/File";
import { LabelType } from "../common/Label";
import { MagnetType } from "../common/Magnet";
import { TemplateDataType } from "./TemplateData";

export type WorkshopTemplateType = {
	workshopTemplateId: string;
	title: string;
	order: number;
	deleted: boolean;
	files: FileType[];
	workshopId?: string|null;
	magnets: MagnetType[];
	realmUrl: string;
	templates: TemplateDataType[];
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
		templates: "TemplateMetadata[]",
		labels: "Label[]"
	}
};