import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/axios";
import { handleAxiosError } from "../../../utils/handleErrors";

export const createMenuSections = createAsyncThunk(
  "menu/createMenuSections",
  async (sections, thunkAPI) => {
    try {
      const response = await api.post("/menu/sections", { sections });
      return response.data;
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  },
);

export const fetchMenuSections = createAsyncThunk(
  "menu/getMenuSections",
  async (_, thunkAPI) => {
    try {
      const response = await api.get(`/menu/sections`);
      return response.data;
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  },
);

export const updateMenuSection = createAsyncThunk(
  "menu/updateMenuSection",
  async ({ sectionId, data }, thunkAPI) => {
    try {
      const response = await api.put(`/menu/sections/${sectionId}`, data);
      return response.data;
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  },
);

export const deleteMenuSection = createAsyncThunk(
  "menu/deleteMenuSection",
  async (sectionId, thunkAPI) => {
    try {
      const response = await api.delete(`/menu/sections/${sectionId}`);
      return response.data;
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  },
);

export const createMenuItem = createAsyncThunk(
  "menu/createMenuItem",
  async ({ sectionId, itemData }, thunkAPI) => {
    try {
      const response = await api.post("/menu/items", {
        ...itemData,
        sectionId,
      });
      return response.data;
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  },
);

export const fetchMenuItemsBySection = createAsyncThunk(
  "menu/getMenuItemsBySection",
  async ({ sectionId }, thunkAPI) => {
    try {
      const response = await api.get(`/menu/items/section/${sectionId}`);
      return response.data;
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  },
);

export const updateMenuItem = createAsyncThunk(
  "menu/updateMenuItem",
  async ({ itemId, itemData }, thunkAPI) => {
    try {
      const response = await api.put(`/menu/items/${itemId}`, itemData);
      return response.data;
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  },
);

export const deleteMenuItem = createAsyncThunk(
  "menu/deleteMenuItem",
  async (itemId, thunkAPI) => {
    try {
      const response = await api.delete(`/menu/items/${itemId}`);
      return response.data;
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  },
);

export const fetchFullMenu = createAsyncThunk(
  "menu/getFullMenu",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/menu/full-menu");
      return response.data;
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  }
);
