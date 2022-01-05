import { ParticipantType } from "../../ros/common/Participant";

export type N_ParticipantType = ParticipantType & {
    _id:any,
    _partition:string
}
