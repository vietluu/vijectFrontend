import {Tag} from '../types/tag';
import {instance} from '../util/axios';
import {AxiosRequestConfig,AxiosPromise} from 'axios'

export const createLabel = (data: Partial<Tag>): AxiosPromise<Tag> => {
    const request: AxiosRequestConfig = {
        method: 'post',
        url: `/label/${data.projectId}/create`,
        data,
    }
    return instance(request)
}

export const getLabel = (projectId:string): AxiosPromise<Tag[]> => {
    const request: AxiosRequestConfig = {
        method: 'get',
        url: `label/${projectId}`,
    }
    return instance(request)
}

export const getLabelById = (id: string): AxiosPromise<Tag> => {
    const request: AxiosRequestConfig = {
        method: 'get',
        url: `/${id}`,
    }
    return instance(request)
}

export const updateLabel = (req: {
    id: string
    data: { projectId: string; labelName: string; description: string }
}): AxiosPromise<Tag> => {
    const request: AxiosRequestConfig = {
        method: 'patch',
        url: `label/${req.data.projectId}/${req.id}/update`,
        data: req.data,
    }
    return instance(request)
}

export const deleteLabel = (id: string,projectId:string): AxiosPromise => {
    const request: AxiosRequestConfig = {
        method: 'delete',
        url: `label/${projectId}/${id}`,
    }
    return instance(request)
}
