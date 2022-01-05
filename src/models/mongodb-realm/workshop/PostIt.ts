import { PostItType } from "../../ros/workshop/PostIt";

export type N_PostItType = PostItType & {
    _id:any,
    _partition:string
}