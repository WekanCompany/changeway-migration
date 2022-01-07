import { TextGoalType } from "../../ros/workshop/TextGoal";

export type N_TextGoalType = TextGoalType & {
    _id:any;
    _partition:string
}