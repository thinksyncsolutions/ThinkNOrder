import { createSlice } from "@reduxjs/toolkit";
import { createUserThunk, fetchUsersThunk, fetchUsersByBranchThunk } from "./user.thunk";

const initialState = {
    users: [],
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createUserThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createUserThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload);
            })
            .addCase(createUserThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to create user";
            })
            .addCase(fetchUsersThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsersThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsersThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch users";
            })
            .addCase(fetchUsersByBranchThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsersByBranchThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsersByBranchThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch users by branch";
            });
    },
});

export default userSlice.reducer;