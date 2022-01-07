import { MetadataObjectType } from "../../ros/workshop/MetadataObject";

export type N_MetaObjectType = MetadataObjectType & {
_id:any,
_partition:string;
}