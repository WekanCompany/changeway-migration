import { WorkshopParticipantType } from "../workshop/WorkshopPartitipant";
import { EverydayBoardType } from "./EverydayBoard";

export type EverydayLevelType = {
    _id: string;
    levelName: string;
    level: string;
    description?: string;
    associatedBoards: EverydayBoardType[];
    linkageLevelRequired: boolean;
    linkageLevelSet: boolean;
    participant: WorkshopParticipantType;
    name?: string;
    date: Date;
}

export const EverydayLevel = {
    name: "EverydayLevel",
    primaryKey: "_id",
    properties: {
        _id: "string",
        levelName: "string",
        level: "int",
        description: "string?",
        associatedBoards: "EverydayBoard[]",
        linkageLevelRequired: { type: "bool", default: true },
        linkageLevelSet: { type: "bool", default: false },
        participant: "Participant",
        name: "string?",
        date: { type: "date", default: new Date() }
    }
};