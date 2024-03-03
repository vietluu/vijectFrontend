import { AxiosRequestConfig, AxiosPromise } from 'axios'
import * as type from '../types/project'
import { instance } from '../util/axios'
import { user } from '../types/user'
export const createProject = (data: Partial<type.Project>): AxiosPromise => {
    const request: AxiosRequestConfig = {
        method: 'post',
        url: '/project/create',
        data,
    }
    return instance(request)
}
export const getProject = (): AxiosPromise<type.Project[]> => {
    const request: AxiosRequestConfig = {
        method: 'get',
        url: '/project',
    }
    return instance(request)
}
export const getProjectById = (id: string): AxiosPromise<type.Project> => {
    const request: AxiosRequestConfig = {
        method: 'get',
        url: `/project/${id}`,
    }
    return instance(request)
}
export const updateProject = (req: {
    id: string
    data: Partial<type.Project>
}): AxiosPromise<type.Project> => {
    console.log(req, 'hii')
    const request: AxiosRequestConfig = {
        method: 'patch',
        url: `/project/${req.id}/update`,
        data: req.data,
    }
    return instance(request)
}
export const deleteProject = (id: string): AxiosPromise => {
    const request: AxiosRequestConfig = {
        method: 'delete',
        url: `/project/${id}`,
    }
    return instance(request)
}
export const addMember = ({
    email,
    projectId,
}: {
    email: string
    projectId: string
}): AxiosPromise<user[]> => {
    const request: AxiosRequestConfig = {
        method: 'post',
        url: `/project/${projectId}/addMember`,
        data: { email },
    }
    return instance(request)
}

export const removeMember = ({
    email,
    projectId,
}: {
    email: string
    projectId: string
}): AxiosPromise<type.Project> => {
    const request: AxiosRequestConfig = {
        method: 'DELETE',
        url: `/project/${projectId}/removeMember`,
        data: { email },
    }
    return instance(request)
}
export const changeCreator = ({
    email,
    projectId,
}: {
    email: string
    projectId: string
}): AxiosPromise<type.Project> => {
    const request: AxiosRequestConfig = {
        method: 'patch',
        url: `/project/${projectId}/member`,
        data: { email },
    }
    return instance(request)
}
