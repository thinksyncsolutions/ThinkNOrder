import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isServerOnline: true,
};

const networkSlice = createSlice({
  name: "network",
  initialState,
  reducers: {
    serverOffline: (state) => {
      state.isServerOnline = false;
    },
    serverOnline: (state) => {
      state.isServerOnline = true;
    },
  },
});

export const { serverOffline, serverOnline } = networkSlice.actions;
export default networkSlice.reducer;