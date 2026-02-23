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
                state.sections = action.payload.data;
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

  const index = state.sections.findIndex(
    s => s._id === updated._id
  );

  if (index !== -1) {
    state.sections[index] = {
      ...state.sections[index],
      ...updated
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
                state.sections = action.payload.data;
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
  const newItem = action.payload;

  const section = state.sections.find(
    (sec) => sec._id === newItem.sectionId
  );

  if (section) {
    section.items.push(newItem);
  }
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
                const index = state.items.findIndex(item => item._id === action.payload.data._id);
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
                state.items = state.items.filter(item => item._id !== action.payload.data._id);
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
    },
});

export default menuSlice.reducer;