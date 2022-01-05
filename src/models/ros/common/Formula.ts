export type FormulaType = {
    id: string,
    expression: string,
    variables: string[],
    baselineVariableIndex: number,
    achievedVariableIndex: number,
    values: number[]
}

export const Formula = {
    name: "Formula",
    primaryKey: "id",
    properties: {
        id: "string",
        expression: "string",
        variables: "string[]",
        baselineVariableIndex: "int",
        achievedVariableIndex: "int",
        values: "double[]"
    }
};