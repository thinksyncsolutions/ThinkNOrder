import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, selectBranchThunk } from "./auth.thunk";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
  token: localStorage.getItem("token"),
  branches: [],
  requiresBranchSelection: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        console.log("LOGIN PAYLOAD", action.payload);
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.branches = action.payload.branches || [];
        state.requiresBranchSelection = action.payload.requiresBranchSelection;

        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      .addCase(selectBranchThunk.fulfilled, (state, action) => {
  state.token = action.payload.token;
  state.requiresBranchSelection = false;

  localStorage.setItem("token", action.payload.token);
});
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
