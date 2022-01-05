export type ParticipantType = {
    id: string,
    email: string,
    identity: string,
    picture: string,
    companyType: string,
    role: string,
    status: string,
    firstname: string,
    surname: string,
    online: boolean,
    unlock: boolean,
}

export const Participant = {
    name: "Participant",
    primaryKey: "email",
    properties: {
        id: "string?",
        email: "string",
        identity: "string?",
        picture: "string?",
        companyType: "string",
        role: "string",
        // location: "string?",
        status: "string",
        firstname: "string",
        surname: "string",
        online: { type: "bool", default: false },
        unlock: { type: "bool", default: false },
    }
};