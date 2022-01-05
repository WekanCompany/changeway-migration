import { TemplateMetaDataType } from "../common/TemplateMetadata";
import { WorkshopParticipantType } from "./WorkshopPartitipant";
import { XMatrixTriangleType } from "./XMatrixTriangle";


export type XMatrixType = {
	xMatrixId: string,
	title: string,
	displayTitle?: string,
	left: XMatrixTriangleType,
	top: XMatrixTriangleType,
	right: XMatrixTriangleType,
	bottom: XMatrixTriangleType,
	template: TemplateMetaDataType,
	awaitingStep2Approval: boolean,
	step2Rejected: boolean,
	step2RejectionReason?: string,
	step2RejectedBy?: WorkshopParticipantType,
	step2Approved: boolean,
	step2ApprovedBy: WorkshopParticipantType,
	step2ApprovedDate: Date,
	step3Approved: boolean,
	step3ApprovedBy: WorkshopParticipantType,
	step3ApprovedDate: Date,
	deployed: boolean,
	participantList: WorkshopParticipantType[],
	readOnly?: boolean,
	deleted: boolean
}

export const XMatrix = {
	name: "XMatrix",
	primaryKey: "xMatrixId",
	properties: {
		xMatrixId: "string",
		title: "string",
		displayTitle: "string?",
		left: "XMatrixTriangle",
		top: "XMatrixTriangle",
		right: "XMatrixTriangle",
		bottom: "XMatrixTriangle",
		template: "TemplateMetadata",
		awaitingStep2Approval: { type: "bool?", default: false },
		step2Rejected: { type: "bool?", default: false },
		step2RejectionReason: "string?",
		step2RejectedBy: "Participant?",
		step2Approved: { type: "bool?", default: false },
		step2ApprovedBy: "Participant?",
		step2ApprovedDate: "date?",
		step3Approved: { type: "bool?", default: false },
		step3ApprovedBy: "Participant?",
		step3ApprovedDate: "date?",
		deployed: { type: "bool?", default: false },
		participantList: "Participant[]",
		readOnly: { type: "bool?", default: false },
		deleted: { type: "bool", default: false }
	}
};
