import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken";
import { Request, Response } from "express";
import User from "../models/UserModel";
import { CustomRequest } from "../middlewares/authMiddleware";

const registerUser = async (req: Request, res: Response) => {
  try {
    const pre_user = await User.find({ email: req.body.email });
    if (pre_user.length !== 0) {
      console.log(pre_user);
      res.status(500).json({ message: "User already exist" });
      return;
    }

    let { password, ...rest } = req.body;
    password = bcrypt.hashSync(password, 10);
    let user = await User.create({
      password,
      ...rest,
    });

    const id = user._id.toString();

    const token = generateToken(id);

    res.status(200).json({
      name: user.name,
      address: user.address,
      dob: user.dob,
      poster_path: user.poster_path,
      bg_poster: user.bg_poster,
      _id: user._id,
      followings: user.followings,
      followers: user.followers,
      bio: user.bio,
      token: token,
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, phone, password } = req.body;
    if (!password) {
      res.status(400).json({ message: "Provide all details" });
    }
    const user = await User.findOne({ $or: [{ email }, { phone }] });
    if (!user) {
      return res.status(400).json({ error: "Wrong Credentials" });
    }
    const passCompare = bcrypt.compare(password, user.password);
    if (!passCompare) {
      return res.status(400).json({ error: "Wrong Credentials" });
    }

    const id = user._id.toString();

    if (user) {
      res.json({
        name: user.name,
        address: user.address,
        dob: user.dob,
        poster_path: user.poster_path,
        bg_poster: user.bg_poster,
        _id: user._id,
        followings: user.followings,
        followers: user.followers,
        bio: user.bio,
        token: generateToken(id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

const userDetails = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const details = await User.findById(id);
    res.status(200).json(details);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const id = (req as CustomRequest).user._id;

  try {
    const user = await User.find({ _id: id });
    if (!user)
      res.status(400).json({ message: "No such User exist, can't update" });
    const details = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json(details);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

const updateFollow = async (req: Request, res: Response) => {
  console.log(req.body);
  const id = (req as CustomRequest).user._id;

  const { followers, followerId } = req.body;

  try {
      const user = await User.findById(id);
      if (!user)
        res.status(400).json({ message: "No such User exist, can't update" });
      const details = await User.findByIdAndUpdate(
        id,
        { followers: followers },
        {
          new: true,
        }
      );
      await User.findByIdAndUpdate(followerId, {
        followings: id,
      });
      res.status(200).json(details);
  } catch (err: any) {
    console.log(err);
    
    res.status(500).json({ error: err.message });
  }
};

const userDataByEmail = async (req: Request, res: Response) => {
  try {
    const { email, isFirAuth } = req.body;

    if (!isFirAuth) {
      res.status(400).json({ message: "unregistered user" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(400).json({ message: "unregistered user" });
      return;
    }

    const id = user._id.toString();
    let token;
    token = generateToken(id);
    res.status(200).json({
      name: user.name,
      address: user.address,
      dob: user.dob,
      poster_path: user.poster_path,
      bg_poster: user.bg_poster,
      _id: user._id,
      followings: user.followings,
      followers: user.followers,
      bio: user.bio,
      token: token,
    });
  } catch (err: any) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

const getPopularUsers = async (req: Request, res: Response) => {
  console.log(req.method);

  try {
    const id = (req as CustomRequest).user._id;

    const users = await User.find();

    users.sort((a: any, b: any) => {
      return a.followers.length - b.followers.length;
    });

    users.filter((item) => {
      return item._id.toString() !== id;
    });

    users.splice(Math.max(users.length, 6));
    res.status(200).json(users);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export {
  registerUser,
  updateUser,
  loginUser,
  userDetails,
  userDataByEmail,
  getPopularUsers,
  updateFollow,
};
