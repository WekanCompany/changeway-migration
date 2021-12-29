
export type LicenseKeyType = {
	licenseKey: string,
	activationId: number,
	expiration: Date
}


export const LicenseKey = {
	name: "LicenseKey",
	primaryKey: "licenseKey",
	properties: {
		licenseKey: "string",
		activationId: "int",
		expiration: "date"
	}
};
