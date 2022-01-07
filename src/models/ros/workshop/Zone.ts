import { FileType } from "../common/File";
import { IconType } from "./Icon";

export type ZoneType = {
	zoneId: string;
    title: string;
    xLength: number;
    yLength: number;
    x: number;
    y: number;
    colour?: string;
    icon: IconType | any;
    backgroundImage: FileType;
    titleAlignment?: string;
    isHeader:boolean;
    headerColour?:string;
    titleTextColour?:string;
    supplementText?:string;
}


export const Zone = {
	name: "Zone",
	primaryKey: "zoneId",
	properties: {
		zoneId: "string",
		title: "string",
		xLength: "int",
		yLength: "int",
		x: "int",
		y: "int",
		colour: { type: "string?", default: "" },
		icon: "Icon",
		backgroundImage: "File",
		titleAlignment: { type: "string?", default: "" },
		isHeader: { type: "bool?", default: false },
		headerColour: { type: "string?", default: "" },
		titleTextColour: { type: "string?", default: "black" },
		supplementText: { type: "string?", default: "" }
	}
};