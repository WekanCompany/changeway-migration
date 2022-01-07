import { TemplateMetaDataType } from "../../ros/workshop/WorkshopTemplateMetadata";

export type N_TemplateMetaDataType =  TemplateMetaDataType & {
    _id:any,
    _partition:string;
}