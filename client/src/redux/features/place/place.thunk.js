import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/axios";
import { handleAxiosError } from "../../../utils/handleErrors";

/* ===========================
   GET ALL PLACES
=========================== */
export const getPlacesThunk = createAsyncThunk(
  "place/getAll",
  async (params, { rejectWithValue }) => {
    try {
      const res = await api.get("/places", { params });
      return res.data.data; // backend → { success, data }
    } catch (err) {
      return rejectWithValue(handleAxiosError(err));
    }
  }
);

/* ===========================
   CREATE PLACE
=========================== */
export const createPlaceThunk = createAsyncThunk(
  "place/create",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post("/places", payload);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(handleAxiosError(err));
    }
  }
);

/* ===========================
   UPDATE PLACE
=========================== */
export const updatePlaceThunk = createAsyncThunk(
  "place/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/places/${id}`, data);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(handleAxiosError(err));
    }
  }
);

/* ===========================
   DELETE PLACE (SOFT)
=========================== */
export const deletePlaceThunk = createAsyncThunk(
  "place/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/places/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(handleAxiosError(err));
    }
  }
);

/* ===========================
   UPDATE STATUS
=========================== */
export const updatePlaceStatusThunk = createAsyncThunk(
  "place/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const res = await api.patch(`/places/${id}/status`, { status });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(handleAxiosError(err));
    }
  }
);

export const getRunningTablesThunk = createAsyncThunk(
  "place/getRunningTables",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/places/running-tables");
      console.log("Fetched running tables:", res.data); // Debug log
      return res.data.data;
    } catch (err) {
      console.error("Error fetching running tables:", err); // Debug log
      return rejectWithValue(handleAxiosError(err));
    }
  }
);