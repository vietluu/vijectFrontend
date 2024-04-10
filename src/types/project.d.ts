import { user } from './user'

export type Project = {
    _id:  string
    projectName: string
    description: string
    createdAt: string
    updatedAt: string
    creator_id: string
    members: user[]
    taskCount?: number
}
