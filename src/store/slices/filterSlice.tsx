import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface initialStateTypes {
  activeCategory: number;
  activeSortView: number;
}

const initialState: initialStateTypes = {
  activeCategory: 0,
  activeSortView: 1,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setActiveCategory(state, action) {
      state.activeCategory = action.payload;
    },
    setActiveSortView(state, action) {
      state.activeSortView = action.payload;
    },
    setFilters(state, action) {
      state.activeCategory = action.payload.activeCategory;
      state.activeSortView = action.payload.activeSortView;
    }
  },
});

export const { setActiveCategory, setActiveSortView, setFilters } =
  filterSlice.actions;

export const selectFilter = (state: RootState) => state.filterSlice

export default filterSlice.reducer;
