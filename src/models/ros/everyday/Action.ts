import { WorkshopParticipantType } from "../workshop/WorkshopPartitipant";

export type EverydayActionType = {
    actionId: string;
    type: string;
    action: string;
    actionDescription: string;
    dueDate: Date;
    assignees: WorkshopParticipantType[];
    complete: boolean;
}
export const EverydayAction = {
    name: "Action",
    primaryKey: "actionId",
    properties: {
        actionId: "string",
        type: "string",
        action: "string",
        actionDescription: "string",
        dueDate: "date",
        assignees: "Participant[]",
        complete: "bool"
    }
};