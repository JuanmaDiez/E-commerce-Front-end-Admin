import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: [],
  reducers: {
    call_categories(state, action) {
      return action.payload;
    },

    add_category(state, action) {
      state.push(action.payload);
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

export const {
  call_categories,
  add_category,
  delete_category,
  empty_categories,
} = categorySlice.actions;
export default categorySlice.reducer;
