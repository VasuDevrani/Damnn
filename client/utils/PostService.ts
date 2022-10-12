import { UserI } from "../interfaces/userInterface";
import instance from "./axios";

const fetchTimeLinePosts = async (userInfo: UserI) => {
  const config = {
    headers: { Authorization: `Bearer ${userInfo?.token}` },
  };
  const { data } = await instance.get(`/post/${userInfo?._id}`, config);
  return data;
};

export const PostService ={
    fetchTimeLinePosts
};
