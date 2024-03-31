import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkAPI } from '../../hook/store'
import * as Service from '../../services/task.services'
import * as Types from '../../types/task'

export const getPriorities = createAsyncThunk<Types.Priority[],undefined, ThunkAPI>('task/getPriorities', async (req, { rejectWithValue }) => {
    try {
        const response = await Service.getPriorities();
        return response.data;
    }
    catch (error) {
        return rejectWithValue(error);
    }
})

export const getStatuses = createAsyncThunk<Types.Status[], undefined, ThunkAPI>('task/getStatuses', async (req, { rejectWithValue }) => {
    try {
        const response = await Service.getStatuses();
        return response.data;
    }
    catch (error) {
        return rejectWithValue(error);
    }
})


export const createTask = createAsyncThunk<Types.Task, { projectId: string, data: Types.CreateTask}, ThunkAPI>('task/createTask', async (req, { rejectWithValue }) => {
    try {
        const response = await Service.createTask(req.projectId,req.data);
        return response.data;
    }
    catch (error) {
        return rejectWithValue(error);
    }
})

export const getTasks = createAsyncThunk<Types.Task, { projectId: string, params: { page?: number | string, limit?: number | string, keyword?: string } }, ThunkAPI>('task/getTasks', async ({ projectId, params }, { rejectWithValue }) => {
    try {
        const response = await Service.getTasks(projectId, params);
        return response.data;
    }
    catch (error) {
        return rejectWithValue(error);
    }
})

export const updateTask = createAsyncThunk<Types.SingleTask, { taskId: string, projectId: string, data: Partial<Types.CreateTask> }, ThunkAPI>('task/updateTask', async (req, { rejectWithValue }) => {
    try {
        const response = await Service.updateTask(req.taskId, req.projectId, req.data);
        return response.data;
    }
    catch (error) {
        return rejectWithValue(error);
    }
})

export const deleteTask = createAsyncThunk<Types.SingleTask, { taskId: string, projectId: string }, ThunkAPI>('task/deleteTask', async (req, { rejectWithValue }) => {
    try {
        const response = await Service.deleteTask(req.taskId, req.projectId);
        return response.data;
    }
    catch (error) {
        return rejectWithValue(error);
    }
});

