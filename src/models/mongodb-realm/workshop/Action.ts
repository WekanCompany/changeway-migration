import { ActionType } from "../../ros/workshop/Action";

export type N_ActionType = ActionType & {
    _id:any,
    _partition:string
} 