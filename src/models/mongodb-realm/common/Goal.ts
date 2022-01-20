import { GoalType } from "../../ros/common/Goal";

export type N_GoalType = GoalType & {
    _id:any,
    _partition:string,
}