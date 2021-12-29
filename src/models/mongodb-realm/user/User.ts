

export type N_UserType = {
    _id: any,
    userId: string,
    _partition: string,
    name: string,
    canReadPartitions: string[],
    memberOf: { name: string, partition: string }[],
    companies: string[],
    workshops: string[],
    everydayBoards: string[]
}