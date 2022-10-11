import { UserI } from "./userInterface";

export interface authSliceI {
  userInfo: UserI | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}
