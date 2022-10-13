import { Request, Response } from "express";
import { postI } from "../interfaces/interface";
import { CustomRequest } from "../middlewares/authMiddleware";
import Post from "../models/PostModel";
import User from "../models/UserModel";

const createPost = async (req: Request, res: Response) => {
  const { content, images, likes, shares, comments } = req.body;

  try {
    const post = await Post.create({
      content: content,
      images: images,
      likes: likes,
      shares: shares,
      comments: comments,
      user: req.params.id,
    });

    res.status(200).json(post);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

const deletePost = async (req: Request, res: Response) => {
  console.log(req.method);
  try {
    const id = req.params.id;

    const userId = (req as CustomRequest).user._id;
    const post: postI = (await Post.findById(id)) as postI;

    if (post.user !== userId) {
      res
        .status(400)
        .json({ message: "user not authorised for changes in the post" });
      return;
    }
    await Post.findByIdAndDelete(id);
    res.status(200).json({ message: "post successfully deleted" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

const updatePost = async (req: Request, res: Response) => {  
  try {
    const id = req.params.id;

    const userId = (req as CustomRequest).user._id;    
    const prePost: postI = (await Post.findById(id)) as postI;

    if (prePost.user?.toString() !== userId?.toString()) {
      res
        .status(400)
        .json({ message: "user not authorised for changes in the post" });
      return;
    }
    const post = await Post.findByIdAndUpdate(id, req.body, { new: true });
    
    res.status(200).json(post);
  } catch (err: any) {
    console.log(err);
    
    res.status(500).json({ message: err.message });
  }
};

const getTimelinePost = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id);
    if (!user) {
      res.status(500).json({ message: "user not found" });
    }

    var postArr: postI[] = [];
    var data: postI[] = (await Post.find({ user: id })
      .populate("user")
      .populate("comments")) as postI[];


    if (!data) {
      res.status(400).json({ message: "no post found" });
      return;
    }

    postArr = [...postArr, ...data];

    if (user?.followings) {
      for (var i = 0; i < user.followings.length; i++) {
        data = (await Post.find({ user: user.followings[i] })
          .populate("user")
          .populate("comments")) as postI[];
        postArr = [...postArr, ...data];
      }
    }

    res.status(200).json(postArr);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

const getselfPost = async (req: Request, res: Response) => {
  try {
    const data = await Post.findById((req as CustomRequest).user._id);
    res.status(200).json(data);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export { createPost, deletePost, updatePost, getTimelinePost, getselfPost };
