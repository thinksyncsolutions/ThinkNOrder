import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/axios";
import { handleAxiosError } from "../../../utils/handleErrors";

export const fetchDashboardSummary = createAsyncThunk(
  "dashboard/fetchSummary",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/dashboard/summary");
      return response.data;
    } catch (error) {
    return handleAxiosError(error, { rejectWithValue });
    }
  }
);