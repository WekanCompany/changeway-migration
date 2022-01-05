import { PersonaType } from "../../ros/workshop/Persona";

export type N_PersonaType = PersonaType & {
    _id:any,
    _partition:string;
}