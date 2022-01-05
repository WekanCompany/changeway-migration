export type ColourPaletteType = {
	colourId: string,
	name: string,
	colour: string
}

export const ColourPalette = {
	name: "ColourPalette",
	primaryKey: "colourId",
	properties: {
		colourId: "string",
		name: "string?",
		colour: "string?"
	}
};
