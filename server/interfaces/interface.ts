import mongoose from "mongoose";

export interface UserI {
  name: string;
  dob: string;
  _id?: string;
  password: string;
  email: string;
  phone: string;
  poster_path?: string;
  bg_poster?: string;
  address?: string;
  bio?: string;
  followings?: foll[];
  followers: foll[];
}

export interface foll {
  type?: mongoose.Types.ObjectId | undefined;
  ref?: unknown;
}
