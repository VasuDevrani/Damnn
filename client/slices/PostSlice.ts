import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postSliceI } from "../interfaces/sliceInterfaces";
import { UserI } from "../interfaces/userInterface";
import { PostService } from "../utils/PostService";

const initialState: postSliceI = {
  posts: [],
  isLoading: false,
  isError: false,
  message: "",
};

// fetch timeline posts
export const timeline = createAsyncThunk(
  "post/timeline",
  async (userInfo: UserI, thunkAPI) => {
    try {
      return await PostService.fetchTimeLinePosts(userInfo);
    } catch (err: any) {
      const message =
        (err.message && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const PostSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    reset: (state) => {
      state.posts = [];
      state.isError = false;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(timeline.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(timeline.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(timeline.rejected, (state, action) => {
        state.message = action.payload as string;
        state.isError = true;
      });
  },
});

export const { reset } = PostSlice.actions;
export default PostSlice.reducer;
