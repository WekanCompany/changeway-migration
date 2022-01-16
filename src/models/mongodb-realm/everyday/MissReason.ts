import { MissReasonType } from "../../ros/everyday/MissReason";

export type N_MissReasonType = MissReasonType & {
    _id:any,
    _partition:string;
}