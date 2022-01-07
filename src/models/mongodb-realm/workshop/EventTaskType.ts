import { EventTaskType } from "../../ros/workshop/EventTask";

export type N_EventTaskType = EventTaskType & {
    _id:any,
    _partition:string
}