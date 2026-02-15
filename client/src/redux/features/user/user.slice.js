import { createSlice } from "@reduxjs/toolkit";
import {
  createUserThunk,
  createUserByManagerThunk,
  fetchUsersThunk,
  fetchUsersByBranchThunk,
  fetchUsersByBranchManagerThunk,
  updateUserThunk,
  deleteUserThunk,
} from "./user.thunk";

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
        state.users.unshift(action.payload.user); // instant UI update
      })

      .addCase(createUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create user";
      })
      .addCase(createUserByManagerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUserByManagerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.users.unshift(action.payload); // instant UI update
      })
      .addCase(createUserByManagerThunk.rejected, (state, action) => {
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
      })
      .addCase(fetchUsersByBranchManagerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersByBranchManagerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsersByBranchManagerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch users by branch";
      })
      .addCase(updateUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex(
          (u) => u._id === action.payload._id,
        );
        if (index !== -1) {
          state.users[index] = action.payload; // update user in state
        }
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update user";
      })
      .addCase(deleteUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((u) => u._id !== action.payload.id); // remove user from state
      })
      .addCase(deleteUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete user";
      });
  },
});

export default userSlice.reducer;
