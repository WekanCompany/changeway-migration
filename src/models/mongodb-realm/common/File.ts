import { FileType } from "../../ros/common/File"

export type N_FileType = FileType & {
	_id: any,
	_partition:string
}