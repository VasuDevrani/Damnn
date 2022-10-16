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

export interface postI{
  content?: string;
  user?: string;
  date: Date;
  images?: String[];
  _id?: String;
  likes: Number;
  shares: Number;
  comments: commentI[]
}

export interface commentI{
  content: String;
  user: {type: mongoose.Schema.Types.ObjectId | undefined, ref: 'User'};
  post: {type: mongoose.Schema.Types.ObjectId | undefined, ref: 'Post'}
  replies: Number;
}