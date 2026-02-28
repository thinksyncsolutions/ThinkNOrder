// redux/thunks/orderThunk.js

import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/axios";
import { handleAxiosError } from "../../../utils/handleErrors";

// 🔥 GET ORDERS FOR TABLE
export const fetchOrdersForTable = createAsyncThunk(
  "order/fetchOrdersForTable",
  async (tableId, thunkAPI) => {
    console.log("Fetching orders for table:", tableId);
    try {
      const response = await api.get(`/orders/${tableId}`);
      console.log("Fetched orders for table:", response.data);
      return response.data.orders || [];
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  }
);

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async ({ placeId, restaurantId, branchId, items }, thunkAPI) => {
    try {
      const response = await api.post(
        `/orders/create-order`,
        { placeId, restaurantId, branchId, items }
      );

      return response.data.order;
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  }
);

// 🔥 CREATE ORDER
export const createOrderByAdminItself = createAsyncThunk(
  "order/createOrderByAdminItself",
  async ({ placeId, items }, thunkAPI) => {
    try {
      const response = await api.post(
        `/orders/create-orderByAdminItself`,
        { placeId, items }
      );

      return response.data.order;
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  }
);

// 🔥 CHANGE ORDER STATUS
export const changeOrderStatus = createAsyncThunk(
  "order/changeOrderStatus",
  async ({ orderId, newStatus }, thunkAPI) => {
    try {
      await api.put(`/orders/change-status`, {
        orderId,
        newStatus,
      });

      return { orderId, newStatus };
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  }
);

// 🔥 CLOSE SESSION
export const closeSession = createAsyncThunk(
  "order/closeSession",
  async ({ placeId, paymentMode }, thunkAPI) => {
    try {
      const response = await api.post(`/orders/close-session`, {
        placeId,
        paymentMode,
      });

      return response.data.session;
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  }
);

export const fetchOrdersForKitchen = createAsyncThunk(
  "order/fetchOrdersForKitchen",
  async (_, thunkAPI) => {
    try {
      const response = await api.get(`/orders/kitchen-orders`);
      return response.data || [];
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  }
);