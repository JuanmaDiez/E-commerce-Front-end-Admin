import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: [],
  reducers: {
    call_orders(state, action) {
      return action.payload;
    },
    delete_order(state, action) {
      return state.filter((entry) => {
        return entry._id !== action.payload;
      });
    },
    empty_orders(state, action) {
      return {};
    },
  },
});

export const { call_orders, delete_order, empty_orders } =
  orderSlice.actions;
export default orderSlice.reducer;
