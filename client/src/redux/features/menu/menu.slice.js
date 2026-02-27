import { createSlice } from "@reduxjs/toolkit";
import {
  createMenuSections,
  fetchMenuSections,
  updateMenuSection,
  deleteMenuSection,
  createMenuItem,
  fetchMenuItemsBySection,
  updateMenuItem,
  deleteMenuItem,
  fetchFullMenu,
  fetchFullMenuForUser,
} from "./menu.thunk";

const initialState = {
  sections: [],
  items: [],
  loading: false,
  error: null,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createMenuSections.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMenuSections.fulfilled, (state, action) => {
        state.loading = false;

        // action.payload.data is the single new section object
        const newSection = action.payload.data;

        // IMPORTANT: Spread the existing sections and add the new one
        // This ensures state.sections remains an Array
        state.sections = [...state.sections, { ...newSection, items: [] }];
      })
      .addCase(createMenuSections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create sections";
      })
      .addCase(fetchMenuSections.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenuSections.fulfilled, (state, action) => {
        state.loading = false;
        state.sections = action.payload.data;
      })
      .addCase(fetchMenuSections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch sections";
      })
      .addCase(updateMenuSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // .addCase(updateMenuSection.fulfilled, (state, action) => {
      //     state.loading = false;
      //     state.sections = action.payload.data;
      // })
      .addCase(updateMenuSection.fulfilled, (state, action) => {
        state.loading = false;

        const updated = action.payload.data;

        const index = state.sections.findIndex((s) => s._id === updated._id);

        if (index !== -1) {
          state.sections[index] = {
            ...state.sections[index],
            ...updated,
          };
        }
      })
      .addCase(updateMenuSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update sections";
      })
      .addCase(deleteMenuSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMenuSection.fulfilled, (state, action) => {
        state.loading = false;
        // Filter out the deleted section using the ID passed from the thunk
        // Note: Check if your thunk returns the ID or the deleted object
        const deletedId = action.meta.arg;
        state.sections = state.sections.filter((s) => s._id !== deletedId);
      })
      .addCase(deleteMenuSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete section";
      })
      .addCase(createMenuItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // .addCase(createMenuItem.fulfilled, (state, action) => {
      //     state.loading = false;
      //     state.items.push(action.payload.data);
      // })
      .addCase(createMenuItem.fulfilled, (state, action) => {
        state.loading = false;

        // 1. Extract the actual item from the response wrapper
        const newItem = action.payload.data;

        if (!newItem) return;

        // 2. Find the section in the 'sections' array
        const sectionIndex = state.sections.findIndex(
          (sec) => sec._id === newItem.sectionId,
        );

        // 3. Update the state immutably
        if (sectionIndex !== -1) {
          // Ensure items array exists before pushing
          if (!state.sections[sectionIndex].items) {
            state.sections[sectionIndex].items = [];
          }
          state.sections[sectionIndex].items.push(newItem);
        }

        // 4. Also update the flat 'items' list if you use it elsewhere
        state.items.push(newItem);
      })
      .addCase(createMenuItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create item";
      })
      .addCase(fetchMenuItemsBySection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenuItemsBySection.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
      })
      .addCase(fetchMenuItemsBySection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch items";
      })
      .addCase(updateMenuItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMenuItem.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(
          (item) => item._id === action.payload.data._id,
        );
        if (index !== -1) {
          state.items[index] = action.payload.data;
        }
      })
      .addCase(updateMenuItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update item";
      })
      .addCase(deleteMenuItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMenuItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(
          (item) => item._id !== action.payload.data._id,
        );
      })
      .addCase(deleteMenuItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete item";
      })
      .addCase(fetchFullMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFullMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.sections = action.payload.data; // sections WITH items
      })
      .addCase(fetchFullMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch menu";
      })
      .addCase(fetchFullMenuForUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFullMenuForUser.fulfilled, (state, action) => {
        state.loading = false;
        state.sections = action.payload.data; // sections WITH items
      })
      .addCase(fetchFullMenuForUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch menu for user";
      });
  },
});

export default menuSlice.reducer;
