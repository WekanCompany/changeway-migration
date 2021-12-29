import { ProfileType } from "../../ros/user/Profile";
import { N_AccessTokenType } from "./AccessToken";
import { N_CompanyType } from "./Company";
import { N_LicenseKeyType } from "./LicenseKey";
import { N_SettingType } from "./Settings";
import { N_WorkshopType } from "./Workshop";

export type N_ProfileType = ProfileType & {
	_id: any,
	_partition:string
	workshops: N_WorkshopType[],
	companies: N_CompanyType[],
	settings: N_SettingType[],
	token: N_AccessTokenType,
	files: any,
	licenseKey: N_LicenseKeyType
}