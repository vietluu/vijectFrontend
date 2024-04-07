import { createSlice } from '@reduxjs/toolkit'

import * as Types from '../../types/task'
import { getPriorities, getStatuses, createTask, getTasks, updateTask, deleteTask, createSubTask, getTaskById, updateSubTask, deleteSubTask } from './thunk'

type InitialState = {
    priorities: Types.Priority[] | null
    statuses: Types.Status[] | null
    Task: Types.Task | null
    loading: {
        [key: string]: boolean
    }
    error: {
        [key: string]: string
    }
    taskSelected: Types.SingleTask | undefined
}
const initialState: InitialState = {
    priorities: null,
    statuses: null,
    Task: null,
    loading: {},
    error: {},
    taskSelected: undefined,
}

const taskSlice = createSlice({
    initialState,
    reducers: {
        resetTaskSelected: (state) => {
            state.taskSelected = undefined
        }   
    },
    name: 'task',
    extraReducers: (builder) => {
        builder.addCase(getPriorities.pending, (state) => {
            state.loading[getPriorities.typePrefix] = true
        })
        builder.addCase(getPriorities.fulfilled, (state, action) => {
            state.loading[getPriorities.typePrefix] = false
            state.priorities = action.payload
        })
        builder.addCase(getPriorities.rejected, (state, action) => {
            state.loading[getPriorities.typePrefix] = false
            state.error[getPriorities.typePrefix] =
                action.error.message || 'error'
        })
        builder.addCase(getStatuses.pending, (state) => {
            state.loading[getStatuses.typePrefix] = true
        })
        builder.addCase(getStatuses.fulfilled, (state, action) => {
            state.loading[getStatuses.typePrefix] = false
            state.statuses = action.payload
        })
        builder.addCase(getStatuses.rejected, (state, action) => {
            state.loading[getStatuses.typePrefix] = false
            state.error[getStatuses.typePrefix] =
                action.error.message || 'error'
        })
        builder.addCase(createTask.pending, (state) => {
            state.loading[createTask.typePrefix] = true
        })
        builder.addCase(createTask.fulfilled, (state) => {
            state.loading[createTask.typePrefix] = false
        })
        builder.addCase(createTask.rejected, (state, action) => {
            state.loading[createTask.typePrefix] = false
            state.error[createTask.typePrefix] = action.error.message || 'error'
        })
        builder.addCase(getTasks.pending, (state) => {
            state.loading[getTasks.typePrefix] = true
        })
        builder.addCase(getTasks.fulfilled, (state, action) => {
            state.loading[getTasks.typePrefix] = false
            state.Task = action.payload
        })
        builder.addCase(getTasks.rejected, (state, action) => {
            state.loading[getTasks.typePrefix] = false
            state.error[getTasks.typePrefix] = action.error.message || 'error'
        })
        builder.addCase(updateTask.pending, (state) => {
            state.loading[updateTask.typePrefix] = true
        }
        )
        builder.addCase(updateTask.fulfilled, (state, action) => {
            state.loading[updateTask.typePrefix] = false
            if (state.Task?.totalTasks) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                state.Task.tasks = state?.Task?.tasks.map((item: Types.SingleTask) =>
                {if (
                    item._id === action.payload._id
                ) {
                    return action.payload
                }
                    return item
                })
            
            }
            if(state.taskSelected){
                state.taskSelected = action.payload
            }
        })
        builder.addCase(updateTask.rejected, (state, action) => {
            state.loading[updateTask.typePrefix] = false
            state.error[updateTask.typePrefix] = action.error.message || 'error'
        })

        builder.addCase(deleteTask.pending, (state) => {
            state.loading[deleteTask.typePrefix] = true
        })
        builder.addCase(deleteTask.fulfilled, (state, action) => {
            state.loading[deleteTask.typePrefix] = false
            if (state.Task?.totalTasks) {
                state.Task.totalTasks -= 1
                state.Task.tasks = state.Task.tasks.filter(
                    (item) => item._id !== action.payload._id
                )
            }
        })
        builder.addCase(deleteTask.rejected, (state, action) => {
            state.loading[deleteTask.typePrefix] = false
            state.error[deleteTask.typePrefix] = action.error.message || 'error'
        })
        builder.addCase(createSubTask.pending, (state) => {
            state.loading[createSubTask.typePrefix] = true
        })
        builder.addCase(createSubTask.fulfilled, (state, action) => {
            state.loading[createSubTask.typePrefix] = false
            if (state.taskSelected) {
                if (state.taskSelected.subTasks?.length) {
                    state.taskSelected.subTasks.push(action.payload)
                }
                else {
                    state.taskSelected.subTasks = [action.payload]
                }
            }
        })
        builder.addCase(createSubTask.rejected, (state, action) => {
            state.loading[createSubTask.typePrefix] = false
            state.error[createSubTask.typePrefix] = action.error.message || 'error'
        });
        builder.addCase(getTaskById.pending, (state) => {
            state.loading[getTaskById.typePrefix] = true
        }
        )
        builder.addCase(getTaskById.fulfilled, (state, action) => {
            state.loading[getTaskById.typePrefix] = false
            state.taskSelected = action.payload
        })
        builder.addCase(getTaskById.rejected, (state, action) => {
            state.loading[getTaskById.typePrefix] = false
            state.error[getTaskById.typePrefix] = action.error.message || 'error'
        })
        builder.addCase(updateSubTask.pending, (state) => {
            state.loading[updateSubTask.typePrefix] = true
        }
        )
        builder.addCase(updateSubTask.fulfilled, (state, action) => {
            state.loading[updateSubTask.typePrefix] = false
            if (state.taskSelected?.subTasks) {
                state.taskSelected.subTasks = state.taskSelected.subTasks.map((item) => {
                    if (item._id === action.payload._id) {
                        return action.payload
                    }
                    return item
                })
            }
        })
        builder.addCase(updateSubTask.rejected, (state, action) => {
            state.loading[updateSubTask.typePrefix] = false
            state.error[updateSubTask.typePrefix] = action.error.message || 'error'
        })
        builder.addCase(deleteSubTask.pending, (state) => {
            state.loading[deleteSubTask.typePrefix] = true
        }
        )
        builder.addCase(deleteSubTask.fulfilled, (state, action) => {
            state.loading[deleteSubTask.typePrefix] = false
            if (state.taskSelected?.subTasks) {
                state.taskSelected.subTasks = state.taskSelected.subTasks.filter(
                    (item) => item._id !== action.payload._id
                )
            }
        })
        builder.addCase(deleteSubTask.rejected, (state, action) => {
            state.loading[deleteSubTask.typePrefix] = false
            state.error[deleteSubTask.typePrefix] = action.error.message || 'error'
        })
    },
})

export const {resetTaskSelected} = taskSlice.actions
export default taskSlice.reducer
