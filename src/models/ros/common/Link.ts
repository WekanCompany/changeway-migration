export type LinkType = {
    linkId: string,
    description: string,
    hyperLink: string,
    visible: boolean
}

export const Link = {
    name: "Link",
    primaryKey: "linkId",
    properties: {
        linkId: "string",
        description: "string",
        hyperLink: "string",
        visible: "bool"
    }
};
