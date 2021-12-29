import { NotificationType } from "../../ros/global/notifications"

export type N_NotificationType = NotificationType & {
	_id: any,
	_partition:string
}