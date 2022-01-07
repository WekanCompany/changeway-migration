import { DataBoxType } from "../../ros/workshop/DataBox";

export type N_DataBoxType = DataBoxType & {
    _id:any,
    _partition:string;
}