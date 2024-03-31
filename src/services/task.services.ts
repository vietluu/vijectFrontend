import { AxiosPromise, AxiosRequestConfig } from 'axios'
import * as Types from '../types/task'
import { instance } from '../util/axios'
import { user } from '../types/user'

export const getPriorities = (): AxiosPromise<Types.Priority[]> => {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: 'task/priority',
    }
    return instance(config)
}

export const getStatuses = (): AxiosPromise<Types.Status[]> => {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: 'task/status',
    }
    return instance(config)
}

export const getMember = (ProjectId: string): AxiosPromise<user[]> => {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: `project/${ProjectId}/member`,
    }
    return instance(config)
}

export const createTask = (projectId:string,data: Types.CreateTask): AxiosPromise<Types.Task> => {
    const config: AxiosRequestConfig = {
        method: 'POST',
        url: `/task/${projectId}/create`,
        data,
    }
    return instance(config)
}

export const getTasks = (projectId: string, params:{page?:number | string, limit?:number | string, keyword?: string}): AxiosPromise<Types.Task> => {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: `/task/${projectId}/tasks`,
        params,
    }
    return instance(config)
}

export const updateTask = (taskId: string, projectId: string, data: Partial<Types.CreateTask>): AxiosPromise<Types.SingleTask> => {
    const config: AxiosRequestConfig = {
        method: 'PATCH',
        url: `/task/${projectId}/${taskId}`,
        data,
    }
    return instance(config)
}

export const deleteTask = (taskId: string, projectId: string): AxiosPromise<Types.SingleTask> => {
    const config: AxiosRequestConfig = {
        method: 'DELETE',
        url: `/task/${projectId}/${taskId}`,
    }
    return instance(config)
}
    