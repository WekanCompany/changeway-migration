import { BoardCompositeSettingsType } from "./BoardCompositeSettings";
import { MeasureSeeSaySettingsType } from "./MeasureSeeSaySettings";

export type BoardSettingsType = {
	settingsId: string,
	brainstorm: boolean,
	goalobject: boolean,
	text: boolean,
	chart: boolean,
	image: boolean,
	baselinemetric: boolean,
	table: boolean,
	goalscorecard: boolean,
	contact: boolean,
	persona: boolean,
	xmatrix: boolean,
	breakthrough: boolean,
	textGoal: boolean,
	measureSeeSaySettings: MeasureSeeSaySettingsType,
	compositeTypes: BoardCompositeSettingsType[]
}


export const BoardSettings = {
	name: "BoardSettings",
	primaryKey: "settingsId",
	properties: {
		settingsId: "string",
		brainstorm: "bool",
		goalobject: "bool",
		text: "bool",
		chart: "bool",
		image: "bool",
		baselinemetric: "bool",
		table: "bool",
		goalscorecard: "bool",
		contact: "bool",
		persona: "bool",
		xmatrix: "bool",
		breakthrough: { type: "bool", default: false },
		textGoal: { type: "bool", default: false },
		measureSeeSaySettings: "MeasureSeeSaySettings",
		compositeTypes: "BoardCompositeSettings[]"
	}
};
