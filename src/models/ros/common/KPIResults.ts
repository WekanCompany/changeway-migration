
export type KPIResultsType = {
    benefit:number,
    realizedBenefit:number,
    percentContribution: number,
    useSuffix: boolean,
    chosenSuffix: string
}

export const KPIResults = {
	name: "KPIResults",
	properties: {
		benefit: "double",
		realizedBenefit: "double",
		percentContribution: "double",
		useSuffix: "bool",
		chosenSuffix: "string"
	}
};