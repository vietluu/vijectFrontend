import { Comment } from "../../types/comment";
import { createSlice } from "@reduxjs/toolkit";
import { createComment, deleteComment, getComments, updateComment } from "./thunk";

type InitialState = {
    comments: Comment[] | [];
    loading: {
        [key: string]: boolean;
    }
    error: {
        [key: string]: string;
    }
}

const initialState: InitialState = {
    comments: [],
    loading: {},
    error: {}
}

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(createComment.pending, (state) => {
            state.loading[createComment.typePrefix] = true;
        })

        builder.addCase(createComment.fulfilled, (state) => {
            state.loading[createComment.typePrefix] = false;
        })
        builder.addCase(createComment.rejected, (state, action) => {
            state.loading[createComment.typePrefix] = false;
            state.error[createComment.typePrefix] = action.error.message || 'Something went wrong';
        })
        builder.addCase(getComments.pending, (state) => {
            state.loading[getComments.typePrefix] = true;
        }
        )
        builder.addCase(getComments.fulfilled, (state, action) => {
            state.loading[getComments.typePrefix] = false;
            state.comments = action.payload;
        })
        builder.addCase(getComments.rejected, (state, action) => {
            state.loading[getComments.typePrefix] = false;
            state.error[getComments.typePrefix] = action.error.message || 'Something went wrong';
        })

        builder.addCase(deleteComment.pending, (state) => {
            state.loading[deleteComment.typePrefix] = true;
        })
        builder.addCase(deleteComment.fulfilled, (state,action) => {
            state.loading[deleteComment.typePrefix] = false;
            state.comments = state.comments.filter((comment) => comment._id !== action.payload._id)
        })
        builder.addCase(deleteComment.rejected, (state, action) => {
            state.loading[deleteComment.typePrefix] = false;
            state.error[deleteComment.typePrefix] = action.error.message || 'Something went wrong';
        })
        builder.addCase(updateComment.pending, (state) => {
            state.loading[updateComment.typePrefix] = true;
        }
        )
        builder.addCase(updateComment.fulfilled, (state, action) => {
            state.loading[updateComment.typePrefix] = false;
            state.comments = state.comments.map((comment) => {
                if (comment._id === action.payload._id) {
                    return action.payload
                }
                return comment
            })
        })
        builder.addCase(updateComment.rejected, (state, action) => {
            state.loading[updateComment.typePrefix] = false;
            state.error[updateComment.typePrefix] = action.error.message || 'Something went wrong';
        })
    }
    
})

export default commentSlice.reducer