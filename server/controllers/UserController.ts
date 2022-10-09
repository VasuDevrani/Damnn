// import bcrypt from "bcryptjs";
// import generateToken from "../utils/generateToken.js";
import { Request, Response } from "express";

const registerUser = async (req: Request, res: Response) => {
  console.log(req.method);
  try {
    
  } catch (err: any) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
};

const loginUser = async (req: Request, res: Response) => {
  console.log(req.method);
  try {
  } catch (err: any) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
};

const userDetails = async (req: Request, res: Response) => {
  console.log(req.method);
  try {
  } catch (err: any) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
};

const updateUser = async (req: Request, res: Response) => {
  console.log(req.method);
  try {
  } catch (err: any) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
};

const followUser = async (req: Request, res: Response) => {
  console.log(req.method);
  try {
  } catch (err: any) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
};

const unfollowUser = async (req: Request, res: Response) => {
  console.log(req.method);
  try {
  } catch (err: any) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
};

export {
  registerUser,
  updateUser,
  loginUser,
  userDetails,
  followUser,
  unfollowUser,
};
