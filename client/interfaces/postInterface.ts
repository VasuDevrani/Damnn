import { UserI } from "./userInterface";

export interface commentI {
  Name: string;
  time: string;
  content: string;
  likes: number;
  shares: number;
}
export interface postI {
  key: string;
  date?: string;
  _id: string;
  user?: UserI;
  name?: string;
  time?: string;
  images?: string[];
  content?: string;
  likes: string[];
  comments?: commentI[];
  shares?: number;
}
