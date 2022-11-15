import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: [],
  reducers: {
    call_products(state, action) {
      return action.payload;
    },
    add_product(state, action) {
      state.push(action.payload);
    },
    delete_product(state, action) {
      return state.filter((product) => {
        return product._id !== action.payload;
      });
    },
    empty_products(state, action) {
      return {};
    },
  },
});

export const { call_products, add_product, delete_product, empty_products } =
  productSlice.actions;
export default productSlice.reducer;
