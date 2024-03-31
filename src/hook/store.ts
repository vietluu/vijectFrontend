import { configureStore } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import userReducer from '../redux/user/slice'
import projectReducer from '../redux/project/slice'
import labelReducer from '../redux/label/slice'
import taskReducer from '../redux/task/slice'
import commentReducer from '../redux/comment/slide'
// ...

export const store = configureStore({
    reducer: {
        userReducer,
        projectReducer,
        labelReducer,
        taskReducer,
        commentReducer,
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
