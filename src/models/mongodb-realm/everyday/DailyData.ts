import { DailyDataType } from "../../ros/everyday/DailyData";

export type N_DailyDataType = DailyDataType & {
    _id:any,
    _partition:string;
}