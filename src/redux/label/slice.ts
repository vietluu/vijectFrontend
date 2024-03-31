import { createSlice } from "@reduxjs/toolkit"
import { Tag } from "../../types/tag"
import { createLabelRequest, deleteLabelRequest, getLabelByIdRequest, getLabelRequest, updateLabelRequest } from "./thunk"

interface LabelType{
    label: Tag[] | undefined
    loading: {
        [key: string]: boolean
    }
    error: {
        [key: string]: string
    }
    labelSelected: Tag | undefined
}

const initialState: LabelType = {
    label: undefined,
    loading: {},
    error: {},
    labelSelected: undefined,
}

const labelSlice = createSlice({
    initialState,
    name: 'label',
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(createLabelRequest.pending, (state) => {
            state.loading[createLabelRequest.typePrefix] = true
        })
        builder.addCase(createLabelRequest.fulfilled, (state, action) => {
            state.loading[createLabelRequest.typePrefix] = false
            state.label = state.label
                ? [...state.label, action.payload]
                : [action.payload]
        })
        builder.addCase(createLabelRequest.rejected, (state, action) => {
            state.loading[createLabelRequest.typePrefix] = false
            state.error[createLabelRequest.typePrefix] =
                action.error.message || 'error'
        })
        builder.addCase(getLabelRequest.pending, (state) => {
            state.loading[getLabelRequest.typePrefix] = true
        })
        builder.addCase(getLabelRequest.fulfilled, (state, action) => {
            state.loading[getLabelRequest.typePrefix] = false
            state.label = action.payload
        })
        builder.addCase(getLabelRequest.rejected, (state, action) => {
            state.loading[getLabelRequest.typePrefix] = false
            state.error[getLabelRequest.typePrefix] =
                action.error.message || 'error'
        })
        builder.addCase(getLabelByIdRequest.pending, (state) => {
            state.loading[getLabelByIdRequest.typePrefix] = true
        })
        builder.addCase(getLabelByIdRequest.fulfilled, (state, action) => {
            state.loading[getLabelByIdRequest.typePrefix] = false
            state.labelSelected = action.payload
        })
        builder.addCase(getLabelByIdRequest.rejected, (state, action) => {
            state.loading[getLabelByIdRequest.typePrefix] = false
            state.error[getLabelByIdRequest.typePrefix] =
                action.error.message || 'error'
        })
        builder.addCase(updateLabelRequest.pending, (state) => {
            state.loading[updateLabelRequest.typePrefix] = true
        })
        builder.addCase(updateLabelRequest.fulfilled, (state, action) => {
            state.loading[updateLabelRequest.typePrefix] = false
            state.label = state.label?.map((item) =>
                item._id === action.payload._id ? action.payload : item
            )
        }
        )
        builder.addCase(updateLabelRequest.rejected, (state, action) => {
            state.loading[updateLabelRequest.typePrefix] = false
            state.error[updateLabelRequest.typePrefix] =
                action.error.message || 'error'
        })
        builder.addCase(deleteLabelRequest.pending, (state) => {
            state.loading[deleteLabelRequest.typePrefix] = true
        })
        builder.addCase(deleteLabelRequest.fulfilled, (state, action) => {
            state.loading[deleteLabelRequest.typePrefix] = false
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            state.label = state.label?.filter((item) => item._id !== action.payload?._id)
        })
        builder.addCase(deleteLabelRequest.rejected, (state, action) => {
            state.loading[deleteLabelRequest.typePrefix] = false
            state.error[deleteLabelRequest.typePrefix] =
                action.error.message || 'error'
        })
    }
})

export default labelSlice.reducer
