import { AxiosRequestConfig, AxiosPromise } from 'axios';
import * as type from '../types/project';
import { instance } from '../util/axios';
export const createProject = (data: Partial<type.Project>): AxiosPromise => {
    const request: AxiosRequestConfig = {
        method: 'post',
        url: '/project/create',
        data,
    }
    return instance(request);
}
export const getProject = (): AxiosPromise<type.Project[]> => {
    const request: AxiosRequestConfig = {
        method: 'get',
        url: '/project',
    }
    return instance(request);
}
export const getProjectById = (id: string): AxiosPromise<type.Project> => {
    const request: AxiosRequestConfig = {
        method: 'get',
        url: `/project/${id}`,
    }
    return instance(request);
}
export const updateProject = (id: string, data: Partial<type.Project>): AxiosPromise<type.Project> => {
    const request: AxiosRequestConfig = {
        method: 'patch',
        url: `/project/${id}`,
        data,
    }
    return instance(request);
}
export const deleteProject = (id: string): AxiosPromise => {
    const request: AxiosRequestConfig = {
        method: 'delete',
        url: `/project/${id}`,
    }
    return instance(request);
}