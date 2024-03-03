import { createSlice } from '@reduxjs/toolkit'
import * as type from '../../types/user'
import { getUserInfo, login, updateProfile } from './thunk'
import { register } from './thunk'
export interface user {
    loading: {
        [key: string]: boolean
    }
    isLogin: boolean
    userInfo: type.user | undefined
    error: {
        [key: string]: string
    }
}
const initialState: user = {
    loading: {},
    isLogin: !!localStorage.getItem('token'),
    userInfo: undefined,
    error: {},
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signOut: (state) => {
            localStorage.removeItem('token')
            state.isLogin = false
            state.userInfo = undefined
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getUserInfo.pending, (state) => {
            state.loading[getUserInfo.typePrefix] = true
        })
        builder.addCase(getUserInfo.fulfilled, (state, action) => {
            state.loading[getUserInfo.typePrefix] = false
            state.isLogin = true
            state.userInfo = action.payload
        })
        builder.addCase(getUserInfo.rejected, (state, action) => {
            state.loading[getUserInfo.typePrefix] = false
            state.error[getUserInfo.typePrefix] =
                action.error.message || 'error'
        })
        builder.addCase(login.pending, (state) => {
            state.loading[login.typePrefix] = true
        })
        builder.addCase(login.fulfilled, (state) => {
            state.loading[login.typePrefix] = false
            state.isLogin = true
        })
        builder.addCase(login.rejected, (state, action) => {
            state.loading[login.typePrefix] = false
            state.error[login.typePrefix] = action.error.message || 'error'
        })
        builder.addCase(register.pending, (state) => {
            state.loading[register.typePrefix] = true
        })
        builder.addCase(register.fulfilled, (state) => {
            state.loading[register.typePrefix] = false
            state.isLogin = true
        })
        builder.addCase(register.rejected, (state, action) => {
            state.loading[register.typePrefix] = false
            state.error[register.typePrefix] = action.error.message || 'error'
        })
        builder.addCase(updateProfile.pending, (state) => {
            state.loading[updateProfile.typePrefix] = true
        })
        builder.addCase(updateProfile.fulfilled, (state, action) => {
            state.loading[updateProfile.typePrefix] = false
            state.userInfo = action.payload
        })
        builder.addCase(updateProfile.rejected, (state, action) => {
            state.loading[updateProfile.typePrefix] = false
            state.error[updateProfile.typePrefix] =
                action.error.message || 'error'
        })
        
    },
})
export const { signOut } = userSlice.actions
export default userSlice.reducer
