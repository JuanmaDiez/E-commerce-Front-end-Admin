import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: [],
  reducers: {
    call_categories(state, action) {
      return action.payload;
    },
    delete_category(state, action) {
      return state.filter((entry) => {
        return entry._id !== action.payload;
      });
    },
    empty_categories(state, action) {
      return {};
    },
  },
});

export const { call_categories, delete_category, empty_categories } =
  categorySlice.actions;
export default categorySlice.reducer;
