import { KPIResultsType } from "../common/KPIResults";
import { LabelType } from "../common/Label";
import { TableType } from "../common/Table";
import { TemplateMetaDataType } from "../common/TemplateMetadata";
import { BoardType } from "./Board";
import { BreakthroughMetadataType } from "./BreakthroughMetadata";
import { MetadataObjectType } from "./MetadataObject";
import { PreEventChecklistType } from "./PreEventChecklist";
import { ProcessType } from "./Process";
import { WorkshopLocationType } from "./WorkshopLocation";
import { WorkshopParticipantType } from "./WorkshopPartitipant";

export type WorkshopType = {
	workshopId: string,
	name: string,
	description: string,
	facilitator: string,
	company: string,
	companyName?: string,
	startDate: Date,
	endDate: Date,
	status: string,
	workshopVersion: number,
	participants: WorkshopParticipantType[],
	divisions: string[],
	locations: string[],
	templates: TemplateMetaDataType[],
	process: ProcessType[],
	tables: TableType[],
	workshopLocations: WorkshopLocationType[],
	buisnessFunction: string[],
	primaryType: string,
	secondaryType: string,
	standardWorkingHours: number,
	columns: PreEventChecklistType[],
	board: BoardType,
	objectList: MetadataObjectType[],
	nonRecurringKPITotals: KPIResultsType,
	recurringKPITotals: KPIResultsType,
	breakthrough: BreakthroughMetadataType|any,
	minorVerionforV1: number,
	labelList: LabelType[]
}
export const Workshop = {
	name: "Workshop",
	primaryKey: "workshopId",
	properties: {
		workshopId: "string",
		name: "string",
		description: "string",
		facilitator: "string",
		company: "string",
		companyName: "string?",
		startDate: "date",
		endDate: "date",
		status: "string",
		workshopVersion: { type: "int", default: 0 },
		participants: "Participant[]",
		divisions: "string[]",
		locations: "string[]",
		templates: "TemplateMetadata[]",
		process: "Process[]",
		tables: "Table[]",
		workshopLocations: "WorkshopLocation[]",
		buisnessFunction: "string[]",
		primaryType: "string",
		secondaryType: "string",
		standardWorkingHours: "double",
		columns: "PreEventChecklist[]",
		board: "Board",
		objectList: "MetadataObject[]",
		nonRecurringKPITotals: "KPIResults",
		recurringKPITotals: "KPIResults",
		breakthrough: "BreakthroughMetadata",
		minorVerionforV1: { type: "int", default: 0 },
		labelList: "Label[]"
	}
};