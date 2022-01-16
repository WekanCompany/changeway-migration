
export type EverydayBoardInstructionsType = {
	boardId: string,
	userEmail: string,
	displayInstructions: boolean
}


export const EverydayBoardInstructions = {
	name: "EverydayBoardInstructions",
	properties: {
		boardId: "string",
		userEmail: "string",
		displayInstructions: { type: "bool", default: true }
	}
};
