import { CommentType } from "../../ros/workshop/Comment";

export type N_CommentType = CommentType & {
    _id:any,
    _partition:string;
}