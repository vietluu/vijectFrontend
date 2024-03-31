import { Task } from "./task";
import { user } from "./user";

export type Comment = {
    _id: string;
    creator: user;
    task: Task
    content: string;
}

export type CreateComment = {
    comment: string;
}
