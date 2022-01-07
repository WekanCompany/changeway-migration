import { BoardCardType } from "../../ros/workshop/BoardCard";

export type N_BoardCardType = BoardCardType & {
    _id:any,
    _partition:string;
}