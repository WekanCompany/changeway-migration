export type LabelType = {
    _id: string,
    title: string,
    colour: string,
    isDefault: boolean,
    isDeleted: boolean
}

export const Label = {
    name: "Label",
    primaryKey: "_id",
    properties: {
        _id: "string",
        title: { type: "string?", default: "" },
        colour: "string?",
        isDefault: { type: "bool", default: false },
        isDeleted: { type: "bool", default: false }
    }
};