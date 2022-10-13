import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../slices/UserSlice";
import PostReducer from "../slices/PostSlice";

// In redux store represents the container for initalstate of an app
export const store = configureStore({
  reducer: {
    user: UserReducer,
    post: PostReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
