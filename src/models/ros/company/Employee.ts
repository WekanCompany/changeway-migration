export type EmployeeType = {
	identity: string,
	email: string,
	picture: string
}

export const Employee = {
	name: "Employee",
	primaryKey: "identity",
	properties: {
		identity: "string",
		email: "string",
		picture: "string"
	}
};
