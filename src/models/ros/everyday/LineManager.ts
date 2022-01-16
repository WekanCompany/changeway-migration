import { ShiftTimingType } from "./ShiftTiming";

export type LineManagerType = {
	_id: string,
	name: string,
	date: Date,
	shift: ShiftTimingType
}


export const LineManager = {
	name: "LineManager",
	primaryKey: "_id",
	properties: {
		_id: "string",
		name: "string",
		date: "date",
		shift: "ShiftTiming"
	}
};
