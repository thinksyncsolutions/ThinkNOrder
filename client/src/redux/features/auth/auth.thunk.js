import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/axios";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (payload) => {
    const res = await api.post("/auth/login", payload);
    return res.data;
  }
);
