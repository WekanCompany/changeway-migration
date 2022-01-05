import { KPIType } from "../../ros/common/KPI";

export type N_KPIType = KPIType & {
    _id:any, 
    _partition:string
}