import { MajorMinorType } from "../../ros/workshop/MajorMinor";

export type N_MajorMinorType = MajorMinorType & {
    _id:any,
    _partition:string;
}