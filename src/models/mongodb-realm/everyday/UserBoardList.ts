import { UserBoardListType } from "../../ros/everyday/UserBoardList";

export type N_UserBoardListType = UserBoardListType & {
    _id:any;
    _partition:string;
}