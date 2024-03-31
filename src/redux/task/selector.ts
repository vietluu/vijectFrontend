import { RootState } from '../../hook/store'
export const TaskReducer = (
    state: RootState
): typeof state.taskReducer => state.taskReducer
