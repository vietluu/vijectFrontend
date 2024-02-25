import { AxiosRequestConfig, AxiosPromise } from 'axios'
import * as type from '../types/user'
import { instance } from '../util/axios'

export const getUser = (): AxiosPromise<type.user> => {
    const request: AxiosRequestConfig = {
        method: 'get',
        url: '/auth/user',
    }
    return instance(request);
}
export const login = (data: type.userLogin): AxiosPromise<{token:string}> => { 
    const request: AxiosRequestConfig = {
        method: 'post',
        url: '/auth/signIn',
        data,
    }
    return instance(request);   
}
export const register = (data: type.userRegister): AxiosPromise<{token:string}> => {
    const request: AxiosRequestConfig = {
        method: 'post',
        url: '/auth/signUp',
        data,
    }
    return instance(request);
}
export const updateProfile = (data: Partial<type.user>): AxiosPromise<type.user> => {
    const request: AxiosRequestConfig = {
        method: 'patch',
        url: '/auth/user',
        data,
    }
    return instance(request);
}
