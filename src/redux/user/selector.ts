import { RootState } from '../../hook/store'

export const userSelector = (state: RootState): typeof state.userReducer =>
    state.userReducer
