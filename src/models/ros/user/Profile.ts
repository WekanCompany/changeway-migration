import { File, FileType } from "../common/File";
import { AccessTokenType } from "./AccessToken";
import { CompanyType } from "./Company";
import { LicenseKeyType } from "./LicenseKey";
import { SettingType } from "./Settings";
import { WorkshopType } from "./Workshop";


export type ProfileType = {
	identity: string,
	role: string,
	firstname: string,
	surname: string,
	email: string,
	profilePicture: FileType,
	logoFile:FileType,
	extraInfo: boolean,
	privacyPolicy: boolean,
	workshops: WorkshopType[],
	companies: CompanyType[],
	settings: SettingType[],
	token: AccessTokenType,
	files: FileType[],
	licenseKey: LicenseKeyType
}



export const Profile = {
	name: "Profile",
	primaryKey: "identity",
	properties: {
		identity: "string",
		role: "string",
		firstname: "string",
		surname: "string",
		email: "string",
		profilePicture: "File?",
		logoFile:"File?",
		extraInfo: { type: "bool", default: false },
		privacyPolicy: "bool",
		workshops: "Workshop[]",
		companies: "Company[]",
		settings: "Setting[]",
		token: "AccessToken",
		files: "File[]",
		licenseKey: "LicenseKey"
	}
};