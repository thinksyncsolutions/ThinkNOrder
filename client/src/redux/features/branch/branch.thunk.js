import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/axios";
import { handleAxiosError } from "../../../utils/handleErrors";

export const createBranchThunk = createAsyncThunk(
  "branch/create",
  async (payload, thunkAPI) => {
    try {
      const res = await api.post("/auth/create-branch", payload);
      return res.data;
    } catch (err) {
      return handleAxiosError(err, thunkAPI);
    }
  },
);

export const fetchBranchesThunk = createAsyncThunk(
  "branch/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/branches");
      return res.data;
    } catch (err) {
      return handleAxiosError(err, thunkAPI);
    }
  },
);
