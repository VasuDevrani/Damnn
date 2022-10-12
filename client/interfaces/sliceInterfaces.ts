import { postI } from "./postInterface";
import { UserI } from "./userInterface";

export interface authSliceI {
  userInfo: UserI | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}

export interface postSliceI {
  posts: postI[];
  isLoading: boolean;
  isError: boolean;
  message: string;
}