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

const login = async (userData: { email: string; password: string }) => {
  const response = await instance.post("/user/login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
    console.log(response.data);
  }
  return response.data;
};

const firGooglAuth = async (userData: { email: string; isFirAuth: boolean }) => {
  const response = await instance.post("/user/dt", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
    console.log(response.data);
  }
  return response.data;
};

const authService = {
  register,
  login,
  firGooglAuth
};

export default authService;
