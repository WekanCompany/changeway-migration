export type FileType = {
    fileId: string,
    url: string,
    type: string,
    text: string,
    thumbnail?: string,
    updatedAt: Date,
    createdAt: Date,
}


export const File = {
    name: "File",
    primaryKey: "fileId",
    properties: {
        fileId: "string",
        url: "string",
        type: "string",
        text: "string",
        thumbnail: "string?",
        updatedAt: "date?",
        createdAt: "date?",
    }
};
