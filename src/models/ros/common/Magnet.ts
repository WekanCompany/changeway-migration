export type MagnetType = {
    id: string,
    name: string,
    color: string,
    isDefault: boolean
}


export const Magnet = {
    name: "Magnet",
    primaryKey: "id",
    properties: {
        id: "string",
        name: "string",
        color: "string",
        isDefault: { type: "bool?", default: false }
    }
};
