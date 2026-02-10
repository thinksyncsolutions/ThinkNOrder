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