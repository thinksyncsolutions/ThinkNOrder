import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/axios";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/login", payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.response?.data?.message || "Login failed");
    }
  }
);
