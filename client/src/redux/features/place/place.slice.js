import { createSlice } from "@reduxjs/toolkit";
import {
  getPlacesThunk,
  getRunningTablesThunk,
  createPlaceThunk,
  updatePlaceThunk,
  deletePlaceThunk,
} from "./place.thunk";

const initialState = {
  places: [],
  runningTables: [],

  loadingPlaces: false,
  loadingRunningTables: false,
  loadingAction: false,

  error: null,
};

const placeSlice = createSlice({
  name: "place",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      /* ================= GET PLACES ================= */
      .addCase(getPlacesThunk.pending, (state) => {
        state.loadingPlaces = true;
      })
      .addCase(getPlacesThunk.fulfilled, (state, action) => {
        state.loadingPlaces = false;
        state.places = action.payload;
      })
      .addCase(getPlacesThunk.rejected, (state, action) => {
        state.loadingPlaces = false;
        state.error = action.payload;
      })

      /* ================= GET RUNNING TABLES ================= */
      .addCase(getRunningTablesThunk.pending, (state) => {
        state.loadingRunningTables = true;
      })
      .addCase(getRunningTablesThunk.fulfilled, (state, action) => {
        state.loadingRunningTables = false;
        state.runningTables = action.payload;
      })
      .addCase(getRunningTablesThunk.rejected, (state, action) => {
        state.loadingRunningTables = false;
        state.error = action.payload;
      })

      /* ================= CREATE ================= */
      .addCase(createPlaceThunk.pending, (state) => {
        state.loadingAction = true;
      })
      .addCase(createPlaceThunk.fulfilled, (state, action) => {
        state.loadingAction = false;
        state.places.push(action.payload);
      })
      .addCase(createPlaceThunk.rejected, (state, action) => {
        state.loadingAction = false;
        state.error = action.payload;
      })

      /* ================= UPDATE ================= */
      .addCase(updatePlaceThunk.fulfilled, (state, action) => {
        const index = state.places.findIndex(
          (p) => p._id === action.payload._id
        );
        if (index !== -1) state.places[index] = action.payload;
      })

      /* ================= DELETE ================= */
      .addCase(deletePlaceThunk.fulfilled, (state, action) => {
        state.places = state.places.filter(
          (p) => p._id !== action.payload
        );
      });
  },
});

export default placeSlice.reducer;