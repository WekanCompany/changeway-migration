import { ParticipantType } from "../common/Participant";
import { EmployeeType } from "./Employee";
import { LocationType } from "./Location";

export type DivisionType = {
	divisionId: string,
	name: string,
	primaryBusinessFunction: string,
	secondaryBusinessFunction: string,
	componentBusinessModelDefinition: string,
	employees: EmployeeType[],
	locations: LocationType[],
	participants: ParticipantType[]
}


export const Division = {
	name: "Division",
	primaryKey: "divisionId",
	properties: {
		divisionId: "string",
		name: "string",
		primaryBusinessFunction: "string",
		secondaryBusinessFunction: "string",
		componentBusinessModelDefinition: "string",
		employees: "Employee[]",
		locations: "Location[]",
		participants: "Participant[]"
	}
};
