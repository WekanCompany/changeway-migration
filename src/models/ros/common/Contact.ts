export type ContactType = {
    contactId: string,
    firstname: string,
    surname: string,
    email: string,
    description: string,
    owner: string,
    dueDate: Date,
    status: string,
    done: boolean
}
export const Contact = {
    name: "Contact",
    primaryKey: "contactId",
    properties: {
        contactId: "string",
        firstname: "string",
        surname: "string",
        email: "string",
        description: "string",
        owner: "string",
        dueDate: "date",
        status: "string",
        done: "bool"
    }
};
