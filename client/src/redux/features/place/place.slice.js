import { createSlice } from "@reduxjs/toolkit";
import {
  getPlacesThunk,
  createPlaceThunk,
  updatePlaceThunk,
  deletePlaceThunk,
  updatePlaceStatusThunk,
} from "./place.thunk";

const initialState = {
  places: [],
  loading: false,
  error: null,
};

const placeSlice = createSlice({
  name: "place",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      /* ================= GET ================= */
      .addCase(getPlacesThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPlacesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.places = action.payload;
      })
      .addCase(getPlacesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= CREATE ================= */
      .addCase(createPlaceThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPlaceThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.places.push(action.payload);
      })
      .addCase(createPlaceThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create place";
      })

      /* ================= UPDATE ================= */
      .addCase(updatePlaceThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePlaceThunk.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.places.findIndex(
          (p) => p._id === action.payload._id
        );
        if (index !== -1) state.places[index] = action.payload;
      })
      .addCase(updatePlaceThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= DELETE ================= */
      .addCase(deletePlaceThunk.fulfilled, (state, action) => {
        state.places = state.places.filter(
          (p) => p._id !== action.payload
        );
      })

      /* ================= STATUS ================= */
      .addCase(updatePlaceStatusThunk.fulfilled, (state, action) => {
        const index = state.places.findIndex(
          (p) => p._id === action.payload._id
        );
        if (index !== -1) state.places[index] = action.payload;
      });
  },
});

export default placeSlice.reducer;
