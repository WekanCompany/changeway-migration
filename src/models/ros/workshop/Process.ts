export type ProcessType = {
	processId: string,
	name?: string,
	nature?: string,
	type?: string,
	frequency?: string,
	taktTime?: number,
	taktTimeUnits?: string,
	numberOfPeople: number
}
export const Process = {
	name: "Process",
	primaryKey: "processId",
	properties: {
		processId: "string",
		name: "string?",
		nature: "string?",
		type: "string?",
		frequency: "string?",
		taktTime: "double?",
		taktTimeUnits: "string?",
		numberOfPeople: "int?"
	}
};
