import { createSlice } from "@reduxjs/toolkit";

const buyHistorySlice = createSlice({
  name: "buyHistory",
  initialState: [],
  reducers: {
    call_buy_history(state, action) {
      return action.payload;
    },
    delete_buy_history(state, action) {
      return state.filter((entry) => {
        return entry._id !== action.payload;
      });
    },
    empty_buy_history(state, action) {
      return {};
    },
  },
});

export const { call_buy_history, delete_buy_history, empty_buy_history } =
  buyHistorySlice.actions;
export default buyHistorySlice.reducer;
