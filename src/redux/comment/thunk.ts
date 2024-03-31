import { Comment, CreateComment } from "../../types/comment";
import { createAsyncThunk } from '@reduxjs/toolkit'
import * as service from '../../services/comment.services'
import { ThunkAPI } from "../../hook/store";



export const getComments = createAsyncThunk<Comment[], { taskId: string, projectId: string }, ThunkAPI>(
    'comment/thunk/getComments',
    async ({ taskId, projectId }, { rejectWithValue }) => {
        try {
            const { data } = await service.getComment({ taskId, projectId })
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
);

export const createComment = createAsyncThunk<Comment, { taskId: string, projectId: string, data: CreateComment }, ThunkAPI>(

    'comment/thunk/createComment', async(req ,{ rejectWithValue }) => {
        try {
            const { data } = await service.createComment(req)
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }

)

export const deleteComment = createAsyncThunk<Comment, string, ThunkAPI>(
    'comment/thunk/deleteComment',
    async (commentId, { rejectWithValue }) => {
        try {
            const { data } = await service.deleteComment(commentId)
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const updateComment = createAsyncThunk<Comment, { commentId: string, data: CreateComment }, ThunkAPI>(
    'comment/thunk/updateComment',
    async ({ commentId, data }, { rejectWithValue }) => {
        try {
            const { data: res } = await service.updateComment(commentId, data)
            return res
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
