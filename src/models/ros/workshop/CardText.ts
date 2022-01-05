export type CardTextType = {
	cardTextId: string,
	value: string,
	editors: string[]
}
export const CardText = {
	name: "CardText",
	primaryKey: "cardTextId",
	properties: {
		cardTextId: "string",
		value: "string",
		editors: "string[]"
	}
};
