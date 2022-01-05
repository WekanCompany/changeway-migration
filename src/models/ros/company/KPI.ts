
export type CKPIType = {
    id: string;
    recurringId: string;
    nonRecurringId: string;
}


export const CKPI = {
    name: "KPI",
    primaryKey: "id",
    properties: {
        id: "string"
    }
};
