import { RevenueType } from "./Revenue";

export type KPIType = {
    id: string,
    metricGroup: string,
    metricName: string,
    units: string,
    useSuffix: boolean,
    chosenSuffix: string,
    cashingTimeFrame: string,
    monetisationNeeded: boolean,
    increasing: boolean,
    conversionFactor: boolean,
    conversionFactorValue: number,
    recurring: RevenueType| any,
    nonRecurring: RevenueType | any,
    currency: string,
    timesUsed: number
}


export const KPI = {
    name: "KPI",
    primaryKey: "id",
    properties: {
        id: "string",
        metricGroup: "string",
        metricName: "string",
        units: "string",
        useSuffix: { type: "bool", default: false },
        chosenSuffix: { type: "string", default: "" },
        cashingTimeFrame: "string",
        monetisationNeeded: "bool",
        increasing: "bool",
        conversionFactor: "bool",
        conversionFactorValue: "double",
        recurring: "Revenue",
        nonRecurring: "Revenue",
        currency: { type: "string", default: "GBP £" },
        timesUsed: { type: "double", default: 0 }
    }
};
