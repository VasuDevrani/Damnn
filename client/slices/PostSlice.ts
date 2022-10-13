import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { commentI } from "../interfaces/postInterface";
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
    resetPost: (state) => {
      state.posts = [];
      state.isError = false;
      state.isLoading = false;
    },
    likePost: (state, action) => {
      const { postId, userId } = action.payload;

      state.posts.map((post) => {
        if (post._id === postId) {
          if (post.likes) {
            if (post.likes.includes(userId)) {
              const index = post.likes.indexOf(userId);
              post.likes.splice(index, 1);
            } else {
              post.likes = [...post.likes, userId];
            }
          }
        }
      });
    },
    addNewPost: (state, action) => {
      const post = action.payload;
      state.posts = [post, ...state.posts];
    },
    addNewComment: (state, action) => {
      const { comment, postId } = action.payload;

      state.posts.map((post) => {
        if (post._id === postId) {
          post.comments = [...(post.comments as commentI[]), comment];
        }
      });
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

export const { resetPost, likePost, addNewPost, addNewComment } = PostSlice.actions;
export default PostSlice.reducer;
