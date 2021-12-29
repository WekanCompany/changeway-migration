
export type NotificationType = {
	id?: string,
	title: string,
	body: string,
	data: string,
	modules?: string,
	secondaryNavigation?: string,
	parseLevel?: number,
	thirdNavigation?: string,
	navigationToScreen?: string,
	relatedIdforNavigation?: string,
	notificationRead: boolean,
	date: Date,
	referenceIdForDelete?: string,
	moduleIcon?: string
}

export const Notifications = {
	name: "Notifications",
	primaryKey: "id",
	properties: {
		id: "string",
		title: "string",
		body: "string",
		data: "string",
		modules: "string?",
		secondaryNavigation: "string?",
		parseLevel: "int?",
		thirdNavigation: "string?",
		navigationToScreen: "string?",
		relatedIdforNavigation: "string?",
		notificationRead: { type: "bool", default: false },
		date: { type: "date", default: new Date() },
		referenceIdForDelete: "string?",
		moduleIcon: "string?"
	}
};

export default Notifications;
