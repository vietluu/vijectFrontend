import { createAsyncThunk } from "@reduxjs/toolkit";
import * as services from "../../services/label.services";
import { Tag } from "../../types/tag";
import { ThunkAPI } from "../../hook/store";


export const createLabelRequest = createAsyncThunk<
    Tag,
    Partial<Tag>,
    ThunkAPI
    >(
    'label/thunk/createLabel',
    async (req, { rejectWithValue }) => {
        try {
            const { data } = await services.createLabel(req)
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const getLabelRequest = createAsyncThunk<
    Tag[],
    string,
    ThunkAPI
    >(
    'label/thunk/getLabel',
    async (req, { rejectWithValue }) => {
        try {
            const { data } = await services.getLabel(req)
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const getLabelByIdRequest = createAsyncThunk<
    Tag,
    string,
    ThunkAPI
    >(
    'label/thunk/getLabelById',
    async (req, { rejectWithValue }) => {
        try {
            const { data } = await services.getLabelById(req)
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const updateLabelRequest = createAsyncThunk<
    Tag,
    { id: string; data: { projectId: string; labelName: string; description: string }},
    ThunkAPI
    >(
    'label/thunk/updateLabel',
    async (req, { rejectWithValue }) => {
        try {
            const { data } = await services.updateLabel(req)
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const deleteLabelRequest = createAsyncThunk<
    string,
    { id: string, projectId: string },
    ThunkAPI
    >(
    'label/thunk/deleteLabel',
    async (req, { rejectWithValue }) => {
        try {
            const { data } = await services.deleteLabel(req.id, req.projectId)
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)