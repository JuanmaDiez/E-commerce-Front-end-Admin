import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: [],
  reducers: {
    call_orders(state, action) {
      return action.payload;
    },
    edit_order(state, action) {
      return state.map((order) => {
        return order._id !== action.payload.id
          ? order
          : {
              ...order,
              state: action.payload.state,
            };
      });
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

export const { call_orders, delete_order, empty_orders, edit_order } =
  orderSlice.actions;
export default orderSlice.reducer;
