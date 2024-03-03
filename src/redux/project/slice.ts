import { createSlice } from '@reduxjs/toolkit'
import { Project } from '../../types/project'
import {
    addProjectMember,
    changeOwner,
    createProjectRequest,
    deleteProjectRequest,
    getProjectByIdRequest,
    getProjectRequest,
    removeProjectMember,
    updateProjectRequest,
} from './thunk'

interface ProjectType {
    project: Project[] | null
    loading: {
        [key: string]: boolean
    }
    error: {
        [key: string]: string
    }
    projectSelected: Project | undefined
}
const initialState: ProjectType = {
    project: null,
    loading: {},
    error: {},
    projectSelected: undefined,
}
const projectSlice = createSlice({
    initialState,
    name: 'project',
    reducers: {
        resetProject: (state) => {
            state.projectSelected = undefined
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createProjectRequest.pending, (state) => {
            state.loading[createProjectRequest.typePrefix] = true
        })
        builder.addCase(createProjectRequest.fulfilled, (state, action) => {
            state.loading[createProjectRequest.typePrefix] = false
            state.project = state.project
                ? [...state.project, action.payload]
                : [action.payload]
        })
        builder.addCase(createProjectRequest.rejected, (state, action) => {
            state.loading[createProjectRequest.typePrefix] = false
            state.error[createProjectRequest.typePrefix] =
                action.error.message || 'error'
        })
        builder.addCase(getProjectRequest.pending, (state) => {
            state.loading[getProjectRequest.typePrefix] = true
        })
        builder.addCase(getProjectRequest.fulfilled, (state, action) => {
            state.loading[getProjectRequest.typePrefix] = false
            state.project = action.payload
        })
        builder.addCase(getProjectRequest.rejected, (state, action) => {
            state.loading[getProjectRequest.typePrefix] = false
            state.error[getProjectRequest.typePrefix] =
                action.error.message || 'error'
        })
        builder.addCase(getProjectByIdRequest.pending, (state) => {
            state.loading[getProjectByIdRequest.typePrefix] = true
        })
        builder.addCase(getProjectByIdRequest.fulfilled, (state, action) => {
            state.loading[getProjectByIdRequest.typePrefix] = false
            state.projectSelected = action.payload
        })
        builder.addCase(getProjectByIdRequest.rejected, (state, action) => {
            state.loading[getProjectByIdRequest.typePrefix] = false
            state.error[getProjectByIdRequest.typePrefix] =
                action.error.message || 'error'
        })
        builder.addCase(updateProjectRequest.pending, (state) => {
            state.loading[updateProjectRequest.typePrefix] = true
        })
        builder.addCase(updateProjectRequest.fulfilled, (state, action) => {
            state.loading[updateProjectRequest.typePrefix] = false
            if (state.project) {
                state.project = state.project.map((item) => {
                    if (item._id === action.payload._id) {
                        return action.payload
                    }
                    return item
                })
            }
        })
        builder.addCase(deleteProjectRequest.fulfilled, (state, action) => {
            state.loading[deleteProjectRequest.typePrefix] = false
            if (state.project) {
                state.project = state.project.filter(
                    (item) => item._id !== action.meta.arg
                )
            }
        })
        builder.addCase(deleteProjectRequest.rejected, (state, action) => {
            state.loading[deleteProjectRequest.typePrefix] = false
            state.error[deleteProjectRequest.typePrefix] =
                action.error.message || 'error'
        })
        builder.addCase(addProjectMember.fulfilled, (state, action) => {
            state.loading[addProjectMember.typePrefix] = false
            if (state.projectSelected) {
                state.projectSelected.members = action.payload
            }
        })
        builder.addCase(addProjectMember.rejected, (state, action) => {
            state.loading[addProjectMember.typePrefix] = false
            state.error[addProjectMember.typePrefix] =
                action.error.message || 'error'
        })
        builder.addCase(addProjectMember.pending, (state) => {
            state.loading[addProjectMember.typePrefix] = true
        })
        builder.addCase(removeProjectMember.fulfilled, (state, action) => {
            state.loading[removeProjectMember.typePrefix] = false
            if (state.projectSelected) {
                state.projectSelected = action.payload
                state.project =
                    state.project?.map((item) => {
                        if (item._id === action.payload._id) {
                            return action.payload
                        }
                        return item
                    }) ?? null
            }
        })
        builder.addCase(removeProjectMember.pending, (state) => {
            state.loading[removeProjectMember.typePrefix] = true
        })
        builder.addCase(changeOwner.fulfilled, (state, action) => {
            state.loading[changeOwner.typePrefix] = false
            if (state.projectSelected) {
                state.projectSelected = action.payload
            }
        })
        builder.addCase(changeOwner.rejected, (state, action) => {
            state.loading[changeOwner.typePrefix] = false
            state.error[changeOwner.typePrefix] =
                action.error.message || 'error'
        })
        builder.addCase(changeOwner.pending, (state) => {
            state.loading[changeOwner.typePrefix] = true
        })
    },
})
export const { resetProject } = projectSlice.actions
export default projectSlice.reducer
