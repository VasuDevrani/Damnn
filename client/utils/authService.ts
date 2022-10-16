import { UserI } from "../interfaces/userInterface";
import instance from "./axios";

const register = async (userData: UserI) => {
  const response = await instance.post("user", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (userData: { email: string; password: string }) => {
  const response = await instance.post("/user/login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const firGooglAuth = async (userData: {
  email: string;
  isFirAuth: boolean;
}) => {
  const response = await instance.post("/user/dt", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const updateFollowings = async (data: { userInfo: UserI; id: string }) => {
  const config = {
    headers: { Authorization: `Bearer ${data.userInfo?.token}` },
  };

  let followers: string[] = [];
  if (
    data.userInfo &&
    data.userInfo.followers &&
    !data.userInfo.followers.includes(data.id)
  )
    followers = [...data.userInfo.followers, data.id];
  else {
    followers = data.userInfo.followers?.filter((item) => {
      return item != data.id;
    }) as string[];
  }
  const response = await instance.put(
    "/user/",
    { followers: followers, followerId: data.id },
    config
  );

  console.log(response.data);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const authService = {
  register,
  login,
  firGooglAuth,
  updateFollowings,
};

export default authService;
