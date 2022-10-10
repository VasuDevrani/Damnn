import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  count: 0,
  loading: true,
  error: false,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
  },
});

export const { increment } = UserSlice.actions;
export default UserSlice.reducer;
