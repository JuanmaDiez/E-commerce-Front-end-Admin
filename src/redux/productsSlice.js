import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: [],
  reducers: {
    call_products(state, action) {
      return action.payload;
    },
    delete_product(state, action) {
      return state.filter((admin) => {
        return admin.id !== action.payload;
      });
    },
    empty_products(state, action) {
      return {};
    },
  },
});

export const { call_products, delete_product, empty_products } =
  productSlice.actions;
export default productSlice.reducer;
