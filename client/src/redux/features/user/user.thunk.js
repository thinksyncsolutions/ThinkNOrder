import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/axios";
import { handleAxiosError } from "../../../utils/handleErrors";

export const createUserThunk = createAsyncThunk(
  "user/create",
  async (payload, thunkAPI) => {
    try {
      const res = await api.post("/auth/create-user", payload);
      return res.data;
    } catch (err) {
      return handleAxiosError(err, thunkAPI);
    }
  },
);

export const createUserByManagerThunk = createAsyncThunk(
  "user/createByManager",
  async (payload, thunkAPI) => {
    try {
      const res = await api.post("/users/create", payload);
      return res.data;
    } catch (err) {
      return handleAxiosError(err, thunkAPI);
    }
  },
);

export const fetchUsersThunk = createAsyncThunk(
  "user/fetchUsers",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/users");
      return res.data;
    } catch (err) {
      return handleAxiosError(err, thunkAPI);
    }
  },
);

export const fetchUsersByBranchThunk = createAsyncThunk(
  "user/fetchByBranch",
  async (branchId, thunkAPI) => {
    try {
      const res = await api.post(`/users/branch/${branchId}`);
      return res.data;
    } catch (err) {
      return handleAxiosError(err, thunkAPI);
    }
  },
);

export const fetchUsersByBranchManagerThunk = createAsyncThunk(
  "user/fetchByBranchManager",
  async (_, thunkAPI) => {
    try {      const res = await api.get(`/users/branch/manager`);
      return res.data;
    } catch (err) {
      return handleAxiosError(err, thunkAPI);
    } 
  },
);

export const updateUserByManagerThunk = createAsyncThunk(
  "user/updateByManager",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await api.put(`/users/manager/${id}`, data);
      return res.data;
    } catch (err) {
      return handleAxiosError(err, thunkAPI);
    }
  },
);

// UPDATE USER
export const updateUserThunk = createAsyncThunk(
  "users/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/users/${id}`, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const deleteUserByManagerThunk = createAsyncThunk(
  "user/deleteByManager",
  async (id, thunkAPI) => {
    try {      const res = await api.delete(`/users/manager/${id}`);
      return { id, message: res.data.message };
    } catch (err) {
      return handleAxiosError(err, thunkAPI);
    }
  },
);

// DELETE USER
export const deleteUserThunk = createAsyncThunk(
  "users/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.delete(`/users/${id}`);
      return { id, message: res.data.message };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);
