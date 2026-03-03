// redux/slices/orderSlice.js

import { createSlice } from "@reduxjs/toolkit";
import {
  fetchOrdersForTable,
  createOrder,
  createOrderByAdminItself,
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

  // ===============================
  // 🔥 FETCH TABLE ORDERS
  // ===============================
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

  // ===============================
  // 🔥 CREATE ORDER (Common Handler)
  // ===============================
const handleCreateOrder = (state, action) => {
  state.loading = false;
  // Ensure we are getting the order object correctly from the thunk return
  const newOrder = action.payload; 

  if (newOrder && newOrder._id) {
    const exists = state.tableOrders.find((o) => o._id === newOrder._id);
    if (!exists) {
      state.tableOrders.push(newOrder);
    }
  }
};

  builder
    .addCase(createOrder.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(createOrder.fulfilled, handleCreateOrder)
    .addCase(createOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "Failed to create order.";
    });

  builder
    .addCase(createOrderByAdminItself.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(createOrderByAdminItself.fulfilled, handleCreateOrder)
    .addCase(createOrderByAdminItself.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "Failed to create order by admin.";
    });

  // ===============================
  // 🔥 CHANGE STATUS
  // ===============================
  builder.addCase(changeOrderStatus.fulfilled, (state, action) => {
    const { orderId, newStatus } = action.payload;

    const order =
      state.tableOrders.find((o) => o._id === orderId) ||
      state.kitchenOrders.find((o) => o._id === orderId);

    if (order) {
      order.status = newStatus;
    }
  });

  // ===============================
  // 🔥 CLOSE SESSION
  // ===============================
  builder
    .addCase(closeSession.pending, (state) => {
      state.sessionClosing = true;
    })
    .addCase(closeSession.fulfilled, (state) => {
      state.sessionClosing = false;
      state.tableOrders = [];
    })
    .addCase(closeSession.rejected, (state, action) => {
      state.sessionClosing = false;
      state.error = action.payload;
    });

  // ===============================
  // 🔥 FETCH KITCHEN ORDERS
  // ===============================
  builder
    .addCase(fetchOrdersForKitchen.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchOrdersForKitchen.fulfilled, (state, action) => {
      state.loading = false;
      state.kitchenOrders = action.payload;
    })
    .addCase(fetchOrdersForKitchen.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
}
//   extraReducers: (builder) => {
//     // 🔥 FETCH TABLE ORDERS
//     builder
//       .addCase(fetchOrdersForTable.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchOrdersForTable.fulfilled, (state, action) => {
//         state.loading = false;
//         state.tableOrders = action.payload;
//       })
//       .addCase(fetchOrdersForTable.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.tableOrders = [];
//       });

//     // 🔥 CREATE ORDER
//     builder
// .addCase(fetchOrdersForTable.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     })
//     .addCase(createOrder.fulfilled, (state, action) => {
//       if (action.payload) {
//         state.tableOrders.push(action.payload);
//       }
//     });

//     // 🔥 CHANGE STATUS
//     builder.addCase(changeOrderStatus.fulfilled, (state, action) => {
//       const { orderId, newStatus } = action.payload;

//       const order = state.tableOrders.find((o) => o._id === orderId);

//       if (order) {
//         order.status = newStatus;
//       }
//     });

//     // create order by admin itself
//     builder
//     .addCase(createOrderByAdminItself.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     })
//     .addCase(createOrderByAdminItself.fulfilled, (state, action) => {
//       if (action.payload) {
//         state.tableOrders.push(action.payload);
//       }
//     })
//     .addCase(createOrderByAdminItself.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     });

//     // 🔥 CLOSE SESSION
//     builder
//       .addCase(closeSession.pending, (state) => {
//         state.sessionClosing = true;
//       })
//       .addCase(closeSession.fulfilled, (state) => {
//         state.sessionClosing = false;
//         state.tableOrders = []; // clear after settlement
//       })
//       .addCase(closeSession.rejected, (state, action) => {
//         state.sessionClosing = false;
//         state.error = action.payload;
//       });
//       // 🔥 FETCH KITCHEN ORDERS
// builder
//   .addCase(fetchOrdersForKitchen.pending, (state) => {
//     state.loading = true;
//     state.error = null;
//   })
//   .addCase(fetchOrdersForKitchen.fulfilled, (state, action) => {
//     state.loading = false;
//     state.kitchenOrders = action.payload;
//   })
//   .addCase(fetchOrdersForKitchen.rejected, (state, action) => {
//     state.loading = false;
//     state.error = action.payload;
//   });
      
//   },
});

export const { clearTableOrders } = orderSlice.actions;
export default orderSlice.reducer;
