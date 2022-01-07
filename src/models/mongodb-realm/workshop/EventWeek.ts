import { EventWeekType } from "../../ros/workshop/EventWeek";

export type N_EventWeekType = EventWeekType & {
    _id:any,
    _partition:string;
}