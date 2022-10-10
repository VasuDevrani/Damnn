import axios from "axios";
import { UserI } from "../interfaces/userInterface";
import instance from "./axios";

const register = async (userData: UserI) => {
  const response = await instance.post("user", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
    console.log(response.data);
  }
  return response.data;
};

const authService = {
  register,
};

export default authService;
