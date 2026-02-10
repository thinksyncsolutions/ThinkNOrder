import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/axios";
import { handleAxiosError } from "../../../utils/handleErrors";

export const createRestaurantThunk = createAsyncThunk(
  "restaurant/create",
  async (payload, thunkAPI) => {
    try {
      const res = await api.post("/auth/register-restaurant", payload);
      return res.data;
    } catch (err) {
      return handleAxiosError(err, thunkAPI);
    }
    }
);