import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/axios";
import { handleAxiosError } from "../../../utils/handleErrors";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      const res = await api.post("/auth/login", payload);
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.error("Login error:", err);
      return handleAxiosError(err, thunkAPI);
    }
  }
);

export const selectBranchThunk = createAsyncThunk(
  "auth/selectBranch",
  async (branchId, { rejectWithValue }) => {
    try {
      const res = await api.post("/select-branch", { branchId });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

