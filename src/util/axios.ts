import axios from 'axios'
import { routes } from '../navigation/routers'

export const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    timeout: 5000,
})

instance.interceptors.request.use(
    (defaultConfig) => {
        const token = localStorage.getItem('token')
        if (token && !defaultConfig.headers.getAuthorization()) {
            defaultConfig.headers.setAuthorization(`Bearer ${token}`)
        }
        if (!defaultConfig.headers.getContentType()) {
            defaultConfig.headers.setContentType('application/json')
        } // defaultConfig.headers.setAccept('application/json');
        return defaultConfig
    },
    (error) => {
        delete axios.defaults.headers.common['Authorization']
        Promise.reject(error)
    }
)

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log(error)
        if (error.response.status === 401 && localStorage.getItem('token')) {
            localStorage.removeItem('token')
            delete axios.defaults.headers.common['Authorization']
            window.location.href = routes.Login.path
        }
        return Promise.reject(error)
    }
)
