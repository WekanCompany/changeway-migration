import { LineManagerType } from "../../ros/everyday/LineManager";

export type N_LineManagerType = LineManagerType & {
    _id:any,
    _partition:string;
}