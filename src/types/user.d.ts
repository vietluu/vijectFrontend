import { SingleTask } from "./task"

export type user = {
    _id: string
    fullName: string
    email: string
    image: string
}
export type userLogin = {
    email: string
    password: string
}
export type userRegister = {
    fullName: string
    email: string
    password: string
}
export type pswUpdate = {
    oldPassword: string
    newPassword: string
}

export type userTask = {
    created: SingleTask[]
    assigned: SingleTask[]
    completed: SingleTask[]
    doing: SingleTask[]
}