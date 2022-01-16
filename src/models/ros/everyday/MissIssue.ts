import { ParticipantType } from "../common/Participant";
import { EventTaskType } from "../workshop/EventTask";
import { WorkshopParticipantType } from "../workshop/WorkshopPartitipant";

export type MissIssueType = {
	_id: string,
	issue: EventTaskType,
	raisedDate: Date,
	raisedBy: ParticipantType
}

export const MissIssue = {
	name: "MissIssue",
	primaryKey: "_id",
	properties: {
		_id: "string",
		issue: "EventTask",
		raisedDate: "date",
		raisedBy: "Participant"
	}
};