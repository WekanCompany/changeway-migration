import { MonthlyDataType } from "../../ros/everyday/MonthlyData";

export type N_MonthlyDataType = MonthlyDataType & {
    _id:any,
    _partition:string;
}