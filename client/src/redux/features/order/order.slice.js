// redux/slices/orderSlice.js

import { createSlice } from "@reduxjs/toolkit";
import {
  fetchOrdersForTable,
  createOrder,
  changeOrderStatus,
  closeSession,
  fetchOrdersForKitchen,
} from "./order.thunk";

const initialState = {
  tableOrders: [],
  kitchenOrders: [],
  loading: false,
  sessionClosing: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearTableOrders: (state) => {
      state.tableOrders = [];
    },
  },
  extraReducers: (builder) => {
    // 🔥 FETCH TABLE ORDERS
    builder
      .addCase(fetchOrdersForTable.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersForTable.fulfilled, (state, action) => {
        state.loading = false;
        state.tableOrders = action.payload;
      })
      .addCase(fetchOrdersForTable.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.tableOrders = [];
      });

    // 🔥 CREATE ORDER
    builder.addCase(createOrder.fulfilled, (state, action) => {
      if (action.payload) {
        state.tableOrders.push(action.payload);
      }
    });

    // 🔥 CHANGE STATUS
    builder.addCase(changeOrderStatus.fulfilled, (state, action) => {
      const { orderId, newStatus } = action.payload;

      const order = state.tableOrders.find((o) => o._id === orderId);

      if (order) {
        order.status = newStatus;
      }
    });

    // 🔥 CLOSE SESSION
    builder
      .addCase(closeSession.pending, (state) => {
        state.sessionClosing = true;
      })
      .addCase(closeSession.fulfilled, (state) => {
        state.sessionClosing = false;
        state.tableOrders = []; // clear after settlement
      })
      .addCase(closeSession.rejected, (state, action) => {
        state.sessionClosing = false;
        state.error = action.payload;
      });

      builder
      .addCase(fetchOrdersForKitchen.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchOrdersForKitchen.fulfilled, (state, action) => {
        state.kitchenOrders = action.payload;
      })
      .addCase(fetchOrdersForKitchen.pending, (state) => {
        state.loading = true;
      });
  },
});

export const { clearTableOrders } = orderSlice.actions;
export default orderSlice.reducer;
