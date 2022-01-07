import { BoardType } from "../../ros/workshop/Board";

export type N_BoardType = BoardType & {
    _id:any;
    _partition:string;
}