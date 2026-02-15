import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, selectBranchThunk } from "./auth.thunk";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
  token: localStorage.getItem("token"),
  // branches: [],
  // requiresBranchSelection: false,
  // loading: false,
  // error: null,
  branches: JSON.parse(localStorage.getItem("branches")) || [],
  requiresBranchSelection:
    JSON.parse(localStorage.getItem("requiresBranchSelection")) || false,
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
      state.branches = [];
      state.requiresBranchSelection = false;
      localStorage.clear();
    },
    clearBranch(state) {
    state.requiresBranchSelection = true;
  }
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

        // Persist everything
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem(
          "branches",
          JSON.stringify(action.payload.branches || []),
        );
        localStorage.setItem(
          "requiresBranchSelection",
          JSON.stringify(state.requiresBranchSelection),
        );
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(selectBranchThunk.fulfilled, (state, action) => {
        console.log("SELECT BRANCH PAYLOAD", action.payload);
        state.token = action.payload.token;
        state.requiresBranchSelection = false;

        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("requiresBranchSelection", "false");
        localStorage.removeItem("branches"); // Clean up
      });
  },
});

export const { logout, clearBranch } = authSlice.actions;
export default authSlice.reducer;
