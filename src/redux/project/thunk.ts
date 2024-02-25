
import { createAsyncThunk } from '@reduxjs/toolkit';
import * as type from '../../types/project';
import { ThunkAPI } from '../../hook/store';
import { createProject, deleteProject, getProject, getProjectById, updateProject } from '../../services/project.service';

export const createProjectRequest = createAsyncThunk<type.Project, Partial<type.Project>, ThunkAPI>(
    'project/thunk/createProject',
    async (req, { rejectWithValue }) => {
        try {
            const { data } = await createProject(req);
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export const getProjectRequest = createAsyncThunk<type.Project[], undefined, ThunkAPI>(
    'project/thunk/getProject',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await getProject() ;
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export const getProjectByIdRequest = createAsyncThunk<type.Project, string, ThunkAPI>(
    'project/thunk/getProjectById',
    async (req, { rejectWithValue }) => {
        try {
            const { data } = await getProjectById(req);
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export const updateProjectRequest = createAsyncThunk<type.Project,{id: string, data: Partial<type.Project>}, ThunkAPI>(
    'project/thunk/updateProject',
    async (req, { rejectWithValue }) => {
        try {
            const { id, data } = req;
            const { data: updatedData } = await updateProject(id, data);
            return updatedData;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const deleteProjectRequest = createAsyncThunk<
  { code: number },
  string,
  ThunkAPI
>("project/thunk/deleteProject", async (id, { rejectWithValue }) => {
  try {
   const {data} =  await deleteProject(id);
    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

