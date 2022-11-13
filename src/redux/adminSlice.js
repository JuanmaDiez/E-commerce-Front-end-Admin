import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {},
  reducers: {
    login(state, action) {
      return action.payload;
    },
    logout(state, action) {
      return {};
    },
  },
});

export const { login, logout } = adminSlice.actions;
export default adminSlice.reducer;
