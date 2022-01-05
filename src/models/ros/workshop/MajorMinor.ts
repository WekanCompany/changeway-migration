export type MajorMinorType = {
	majorMinorId: string,
	linkedGoalId: string,
	major: boolean,
	minor: boolean
}
export const MajorMinor = {
	name: "MajorMinor",
	primaryKey: "majorMinorId",
	properties: {
		majorMinorId: "string",
		linkedGoalId: "string",
		major: "bool",
		minor: "bool"
	}
};
