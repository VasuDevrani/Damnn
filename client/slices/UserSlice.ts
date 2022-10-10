import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserI } from "../interfaces/userInterface";
import authService from "../utils/authService";

// let userData = window.localStorage.getItem('user')
// userData
//     ? JSON.parse(userData as unknown as string)
//     : 

const initialState = {
  userInfo: null,
  isLoading: false,
  isError: false,
  message: ''
};

// register user
export const register = createAsyncThunk(
  "user/register",
  async (user: UserI, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (err: any) {
      const message =
        (err.message && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = true;
    },
  },

  extraReducers: (builder) => {
    builder 
        .addCase(register.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(register.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.userInfo = action.payload;
        })
        .addCase(register.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.message = action.payload as string;
            state.userInfo = null;
        })
  }
});

export default UserSlice.reducer;
