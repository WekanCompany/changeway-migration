export type SelectType = {
    selectId: string,
    value: string,
    order: number,
    isSelected: boolean
}

export const Select = {
    name: "Select",
    primaryKey: "selectId",
    properties: {
        selectId: "string",
        value: "string",
        order: "int",
        isSelected: "bool"
    }
};
