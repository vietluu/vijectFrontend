import { AxiosRequestConfig, AxiosPromise } from 'axios'
import { instance } from '../util/axios'
import { Comment,CreateComment } from '../types/comment'

export const getComment = ({taskId, projectId}:{taskId: string, projectId: string}): AxiosPromise<Comment[]> => {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: `/comment/${projectId}/${taskId}`
    }
    return instance(config)
}
export const createComment = ({taskId, projectId, data }: {projectId: string, taskId: string, data: CreateComment }): AxiosPromise<Comment> => {
    const config: AxiosRequestConfig = {
        method: 'POST',
        url: `/comment/${projectId}/${taskId}`,
        data
    }
    return instance(config)
}

export const deleteComment = (commentId: string): AxiosPromise<Comment> => {
    const config: AxiosRequestConfig = {
        method: 'DELETE',
        url: `/comment/${commentId}`
    }
    return instance(config)
}

export const updateComment = (commentId: string, data: CreateComment): AxiosPromise<Comment> => {
    const config: AxiosRequestConfig = {
        method: 'PATCH',
        url: `/comment/${commentId}`,
        data
    }
    return instance(config)
}   
