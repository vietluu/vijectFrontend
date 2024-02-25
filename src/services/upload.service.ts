import { AxiosRequestConfig, AxiosPromise } from 'axios'
import { instance } from '../util/axios'

export const uploadImg = (data: FormData): AxiosPromise<{message: string ,image_url: string}> => {
    const request: AxiosRequestConfig = {
        method: 'post',
        url: '/upload',
        data,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    return instance(request);
}