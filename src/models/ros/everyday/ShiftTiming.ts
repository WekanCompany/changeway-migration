export type ShiftTimingType = {
    _id: string,
    dimensionId: string,
    boardId: string,
    shiftId: string,
    shiftNumber: string,
    shiftHoursNumber: string,
    shiftHourTime: string,
    creationDate: Date,
    updatedDate?: Date,
    isDefault: boolean,
    isActive: boolean,
    shiftStartTime: string,
    shiftStartTimeAMPM: string,
    shiftEndTime: string,
    shiftEndTimeAMPM: string,
    isShiftTimeFormatAMPM: boolean
}
export const ShiftTiming = {
    name: "ShiftTiming",
    primaryKey: "_id",
    properties: {
        _id: "string",
        dimensionId: "string",
        boardId: "string",
        shiftId: "string",
        shiftNumber: "string",
        shiftHoursNumber: "string",
        shiftHourTime: "string",
        creationDate: "date",
        updatedDate: "date?",
        isDefault: "bool",
        isActive: "bool",
        shiftStartTime: "string",
        shiftStartTimeAMPM: "string",
        shiftEndTime: "string",
        shiftEndTimeAMPM: "string",
        isShiftTimeFormatAMPM: "bool"
    }
};
