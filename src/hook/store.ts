import { configureStore } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import userReducer from '../redux/user/slice'
import projectReducer from '../redux/project/slice'
// ...

export const store = configureStore({
    reducer: {
        userReducer,
        projectReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
            immutableCheck: false,
        }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export interface ThunkAPI<E = Error> {
    state?: RootState
    dispatch?: AppDispatch
    extra?: unknown
    rejectValue?: AxiosError<E>
    serializedErrorType?: unknown
    pendingMeta?: unknown
    fulfilledMeta?: unknown
    rejectedMeta?: unknown
}
