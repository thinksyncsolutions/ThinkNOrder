import { createSlice } from "@reduxjs/toolkit";
import { createRestaurantThunk } from "./restaurant.thunk";

const initialState = {
  restaurant: null,
  loading: false,
  error: null,
};

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createRestaurantThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRestaurantThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurant = action.payload;
      })
      .addCase(createRestaurantThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default restaurantSlice.reducer;
