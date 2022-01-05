export type TemplateMetaDataType = {
    templateId: string,
		
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