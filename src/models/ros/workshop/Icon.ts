export type IconType = {
	iconId: string;
    name: string;
    type: string;
    color: string;
    size: number;
    altText: string;	
}

export const Icon = {
	name: "Icon",
	primaryKey: "iconId",
	properties: {
		iconId: "string",
		name: "string",
		type: "string",
		color: "string",
		size: "int",
		altText: "string"
	}
};