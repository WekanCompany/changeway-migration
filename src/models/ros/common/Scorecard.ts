import { KPIResultsType } from "./KPIResults";

export type ScorecardType = {
    scorecardId: string,
		title: string,
		metricGroup: string,
		metricName: string,
		unitsGroup: string,
		units: string,
		kpiId: string|null,
		nonRecurringResults: KPIResultsType,
		recurringResults: KPIResultsType,
		useSuffix: boolean,
		chosenSuffix: string,
		baseline: number,
		runType: string,
		scorecardType: string,
		customType: string,
		titlesData: string[],
		planData: number[],
		actualData: number[],
		ascending: boolean,
		progress: string,
		status: string,
		achieved: boolean,
		deleted: boolean
}

export const Scorecard = {
	name: "Scorecard",
	primaryKey: "scorecardId",
	properties: {
		scorecardId: "string",
		title: "string?",
		metricGroup: "string?",
		metricName: "string?",
		unitsGroup: "string?",
		units: "string?",
		kpiId: "string?",
		nonRecurringResults: "KPIResults",
		recurringResults: "KPIResults",
		useSuffix: { type: "bool", default: false },
		chosenSuffix: "string?",
		baseline: "float?",
		runType: "string?",
		scorecardType: "string?",
		customType: "string?",
		titlesData: "string?[]",
		planData: "float?[]",
		actualData: "float?[]",
		ascending: "bool",
		progress: "string?",
		status: { type: "string?" },
		achieved: "bool?",
		deleted: { type: "bool", default: false }
	}
};
