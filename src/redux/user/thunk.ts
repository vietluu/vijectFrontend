import * as type from '../../types/user'
import { createAsyncThunk } from '@reduxjs/toolkit'
import * as service from '../../services/user.service'
import { ThunkAPI } from '../../hook/store'

export const getUserInfo = createAsyncThunk<type.user, undefined, ThunkAPI>(
    'user/thunk/getUser',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await service.getUser()
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
export const login = createAsyncThunk<
    { token: string },
    type.userLogin,
    ThunkAPI
>('user/thunk/login', async (req, { rejectWithValue }) => {
    try {
        const { data } = await service.login(req)
        localStorage.setItem('token', data.token)
        return data
    } catch (error) {
        return rejectWithValue(error)
    }
})
export const register = createAsyncThunk<
    { token: string },
    type.userRegister,
    ThunkAPI
>('user/thunk/register', async (req, { rejectWithValue }) => {
    try {
        const { data } = await service.register(req)
        localStorage.setItem('token', data.token)
        return data
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const updateProfile = createAsyncThunk<
    type.user,
    { image?: string; fullName?: string },
    ThunkAPI
>('user/thunk/updateProfile', async (req, { rejectWithValue }) => {
    try {
        const { data } = await service.updateProfile(req)
        return data
    } catch (error) {
        return rejectWithValue(error)
    }
})
export const changePassword = createAsyncThunk<
    type.user,
    type.pswUpdate,
    ThunkAPI>(
        'user/thunk/changePassword',
        async (req, { rejectWithValue }) => {
            try {
                const { data } = await service.changePassword(req)
                return data
            } catch (error) {
                return rejectWithValue(error)
            }
        }
    )
