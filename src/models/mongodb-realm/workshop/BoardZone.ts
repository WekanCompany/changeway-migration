import { BoardZoneType } from "../../ros/workshop/BoardZone";

export type N_BoardZoneType = BoardZoneType & {
    _id:any,
    _partition:string
}