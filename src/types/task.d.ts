import { user } from "./user"
import { Tag } from "./tag"
import { Project } from "./project"

export type Task = {
    _id: string
    tasks: SingleTask[]
    totalPages: number
    currentPage: number
    totalTasks: number
}
export type SingleTask = {
    _id: string
    taskName: string
    description: string
    priorityId: Priority | null
    labelId: Tag | null
    statusId: Status | null
    subTasks: Subtask[] | null
    projectId: Partial<Project>
    creator: Partial<user>
    createdAt: string
    updatedAt: string
    assignedTo: Partial<user> | null
}
export type Priority = {
    _id: string
    priorityName: string
    color: string
}

export type Status = {
    _id: string
    statusName: string
    color: string
}

export type CreateTask = {
    taskName: string
    description: string
    priorityId?: string | null
    labelId?: string | null
    statusId?: string | null
    projectId: string | null 
    assignedTo?: string | null
    creatorId: string
}
export type Subtask = {
    _id: string
    name: string
    status: boolean
    taskId: string
    createdAt: string
    updatedAt: string
}