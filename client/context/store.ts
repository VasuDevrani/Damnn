import { configureStore } from '@reduxjs/toolkit';
import UserReducer from '../slices/UserSlice';

// In redux store represents the container for initalstate of an app 
export const store = configureStore({
    reducer:{
        user: UserReducer,
    }
})