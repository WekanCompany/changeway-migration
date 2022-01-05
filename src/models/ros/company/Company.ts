import { FileType } from "../common/File";
import { KPIType } from "../common/KPI";
import { MagnetType } from "../common/Magnet";
import { ParticipantType } from "../common/Participant";
import { SettingsMetadataType } from "../common/SettingsMetadata";
import { ColourPaletteType } from "./ColourPalette";
import { DivisionType } from "./Division";
import { SingleTemplateType } from "./SingleTemplate";
import { WorkshopTemplateType } from "./WorkshopTemplate";


export type CompanyType = {
	companyId: string,
	name: string,
	primaryIndustry: string,
	secondaryIndustry: string,
	logoFile: FileType,
	divisions: DivisionType[],
	creator: string,
	kpis: KPIType[],
	currency: string,
	workshopTemplates: WorkshopTemplateType[],
	singleTemplates: SingleTemplateType[],
	participants: any[]| ParticipantType[],
	colours: any[]| ColourPaletteType[],
	zoneHeaderColour: ColourPaletteType,
	defaultMagnets: MagnetType[],
	logos: FileType[],
	companyUrl: string,
	bannerImage: FileType,
	organisationMetadata: SettingsMetadataType[],
	everydaySetup: boolean,
	nextRef: number,
	croppedLogo: FileType
}


export const Company = {
	name: "Company",
	primaryKey: "companyId",
	properties: {
		companyId: "string",
		name: "string",
		primaryIndustry: "string",
		secondaryIndustry: "string",
		logoFile: "File",
		// brandColourPrimary: "string",
		divisions: "Division[]",
		creator: "string?",
		kpis: "KPI[]",
		currency: { type: "string", default: "GBP £" },
		workshopTemplates: "WorkshopTemplate[]",
		singleTemplates: "SingleTemplatee[]",
		participants: "Participant[]",
		// icons: "Icon[]",
		colours: "ColourPalette[]",
		zoneHeaderColour: "ColourPalette",
		defaultMagnets: "Magnet[]",
		logos: "File[]",
		companyUrl: "string?",
		bannerImage: "File",
		organisationMetadata: "SettingsMetadata[]",
		everydaySetup: { type: "bool", default: false },
		nextRef: { type: "int", default: 1 },
		croppedLogo: "File"
	}
};
