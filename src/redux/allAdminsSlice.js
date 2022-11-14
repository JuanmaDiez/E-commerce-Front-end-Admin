import { createSlice } from "@reduxjs/toolkit";

const allAdminSlice = createSlice({
  name: "allAdmin",
  initialState: [],
  reducers: {
    call_admins(state, action) {
      return action.payload;
    },
    delete_admin(state, action) {
      return state.filter((admin) => {
        return admin._id !== action.payload;
      });
    },
    empty_admins(state, action) {
      return {};
    },
  },
});

export const { call_admins, delete_admin, empty_admins } =
  allAdminSlice.actions;
export default allAdminSlice.reducer;
