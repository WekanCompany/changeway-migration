import { FileType } from "../common/File";
import { BrainstormType } from "./Brainstorm";
import { CardTextType } from "./CardText";

export type PersonaType = {
	personaId: string,
	name: CardTextType[],
	nameTitle: string,
	image: FileType,
	imageTitle?: string,
	description: BrainstormType[],
	descriptionTitle?: string,
	empathyMap: BrainstormType[],
	empathyMapTitle?: string,
	empathyMapIconType?: string,
	hillStatements: BrainstormType[],
	hillStatementTitle?: string,
	deleted: boolean
}

export const Persona = {
	name: "Persona",
	primaryKey: "personaId",
	properties: {
		personaId: "string",
		name: "CardText[]",
		nameTitle: "string?",
		image: "File",
		imageTitle: "string?",
		description: "Brainstorm[]",
		descriptionTitle: "string?",
		empathyMap: "Brainstorm[]",
		empathyMapTitle: "string?",
		empathyMapIconType: "string?",
		hillStatements: "Brainstorm[]",
		hillStatementTitle: "string?",
		deleted: "bool?"
	}
};