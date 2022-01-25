import { FormulaType } from "./Formula";

export type RevenueType = {
    id: string,
    recurring: boolean,
    costType: string,
    rule?: string,
    formulaDescription?: string,
    formula: FormulaType|any,
    valuePerUnit: string,
    valuePerUnitDescription?: string
}

export const Revenue = {
    name: "Revenue",
    primaryKey: "id",
    properties: {
        id: "string",
        recurring: "bool",
        costType: "string",
        rule: "string?",
        formulaDescription: "string?",
        formula: "Formula",
        valuePerUnit: "string",
        valuePerUnitDescription: "string?"
    }
};