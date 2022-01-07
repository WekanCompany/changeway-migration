import { SettingsMetadataType } from "../../ros/common/SettingsMetadata";

export type N_SettingsMetadataType = SettingsMetadataType &{
    _id:any,
    _partition?:string
}