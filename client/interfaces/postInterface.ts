export interface commentI {
  Name: string;
  time: string;
  content: string;
  likes: number;
  shares: number;
}
export interface postI {
  key: string;
  _id: string;
  name?: string;
  time?: string;
  images?: string[];
  content?: string;
  likes?: number;
  comments?: commentI[];
  shares?: number;
}
