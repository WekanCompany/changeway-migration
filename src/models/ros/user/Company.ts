import { FileType } from "../common/File";

export type CompanyType = {
	companyId: string,
	url: string,
	name: string,
	logoFile: FileType
}



export const Company = {
	name: "Company",
	primaryKey: "companyId",
	properties: {
		companyId: "string",
		url: "string",
		name: "string",
		logoFile: "File"
	}
};