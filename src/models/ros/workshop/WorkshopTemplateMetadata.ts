import { Settings } from "http2";
import { ContactType } from "../common/Contact";
import { GoalType } from "../common/Goal";
import { LabelType } from "../common/Label";
import { ScorecardType } from "../common/Scorecard";
import { ActionType } from "./Action";
import { BoardType } from "./Board";
import { BrainstormType } from "./Brainstorm";
import { CardTextType } from "./CardText";
import { DataBoxType } from "./DataBox";
import { GeneralType } from "./General";
import { GraphType } from "./Graph";
import { PersonaType } from "./Persona";
import { TemplateLinkerType } from "./TemplateLinker";
import { TextGoalType } from "./TextGoal";
import { XMatrixGoalType } from "./XMatrixGoal";

export type TemplateMetaDataType = {
	templateId: string,
	url: string,
	name: string,
	visualName?: string,
	type: string,
	order: number,
	startDate: Date,
	endDate: Date,
	duration: string,
	numberOfColumns: number,
	status: string,
	brainstorms: BrainstormType[],
	graphs: GraphType[],
	cardTexts: CardTextType[],
	goalObjects: GoalType[],
	baselineMetricObjects: GoalType[],
	goalScorecardObjects: ScorecardType[],
	dataBoxes: DataBoxType[],
	contactObjects: ContactType[],
	xMatrices: XMatrixGoalType[],
	textGoals: TextGoalType[],
	generalObject: GeneralType[],
	actions: ActionType[],
	settings: Settings|any,
	templateLinker: TemplateLinkerType,
	module?: string,
	linkName?: string,
	personas: PersonaType[],
	board: BoardType,
	deleted: boolean,
	labelList: LabelType[],
	isSingleTemplate: boolean
}

export const TemplateMetadata = {
	name: "TemplateMetadata",
	primaryKey: "templateId",
	properties: {
		templateId: "string",
		url: "string",
		name: "string",
		visualName: "string?",
		type: "string",
		order: "int",
		startDate: "date",
		endDate: "date",
		duration: "string",
		numberOfColumns: "int",
		status: "string",
		brainstorms: "Brainstorm[]",
		graphs: "Graph[]",
		cardTexts: "CardText[]",
		goalObjects: "Goal[]",
		baselineMetricObjects: "Goal[]",
		goalScorecardObjects: "Scorecard[]",
		dataBoxes: "DataBox[]",
		contactObjects: "Contact[]",
		xMatrices: "XMatrix[]",
		textGoals: "TextGoal[]",
		generalObject: "General[]",
		actions: "Action[]",
		settings: "Settings",
		templateLinker: "TemplateLinker",
		module: "string?",
		linkName: "string?",
		personas: "Persona[]",
		board: "Board",
		deleted: { type: "bool?", default: false },
		labelList: "Label[]",
		isSingleTemplate: { type: "bool", default: false }
	}
};