import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authSliceI } from "../interfaces/sliceInterfaces";
import { UserI } from "../interfaces/userInterface";
import authService from "../utils/authService";

const initialState: authSliceI = {
  userInfo: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
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

// login user
export const login = createAsyncThunk(
  "user/login",
  async (user: { email: string; password: string }, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (err: any) {
      const message =
        (err.message && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// getData by firebase login
export const firLogin = createAsyncThunk(
  "user/dt",
  async (user: { email: string; isFirAuth: boolean }, thunkAPI) => {
    try {
      return await authService.firGooglAuth(user);
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
      state.isLoading = false;
      state.isSuccess = false;
      state.userInfo = null;
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
        state.isSuccess = true;
        state.userInfo = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload as string;
        state.userInfo = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.userInfo = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload as string;
        state.userInfo = null;
      })
      .addCase(firLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(firLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.userInfo = action.payload;
      })
      .addCase(firLogin.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload as string;
        state.userInfo = null;
      });
  },
});

export const { reset } = UserSlice.actions;
export default UserSlice.reducer;
