import { createSlice } from "@reduxjs/toolkit";
import { createBranchThunk, fetchBranchesThunk } from "./branch.thunk";

const initialState = {
    branches: [],
    loading: false,
    error: null,
};

const branchSlice = createSlice({
    name: "branch",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createBranchThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createBranchThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.branches.push(action.payload);
            })
            .addCase(createBranchThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to create branch";
            })
            .addCase(fetchBranchesThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBranchesThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.branches = action.payload;
            })
            .addCase(fetchBranchesThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch branches";
            });
    },
});

export default branchSlice.reducer;