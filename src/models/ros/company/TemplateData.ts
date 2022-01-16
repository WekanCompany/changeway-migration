export type TemplateDataType = {
    templateId?: string;
    name: string;
    visualName?: string;
    type: string;
    order: number;
}

export const TemplateData = {
    name: "TemplateMetadata",
    primaryKey: "templateId",
    properties: {
        templateId: "string",
        name: "string",
        visualName: "string?",
        type: "string",
        order: "int"
    }
};