export type GraphSettingsType = {
    actualColor: string,
    planColor: string,
    barColor: string,
    paretoLineChartColor: string
}


export const GraphSettings = {
    name: "GraphSettings",
    properties: {
        actualColor: "string",
        planColor: "string",
        barColor: "string",
        paretoLineChartColor: "string"
    }
};