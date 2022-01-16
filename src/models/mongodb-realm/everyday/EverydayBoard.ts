import { EverydayBoardType } from "../../ros/everyday/EverydayBoard";

export type N_EverydayBoardType = EverydayBoardType & {
    _id:any,
    _partition:string
}