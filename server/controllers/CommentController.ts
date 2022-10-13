import { Request, Response } from "express";
import { commentI, postI } from "../interfaces/interface";
import { CustomRequest } from "../middlewares/authMiddleware";
import Comments from "../models/CommentModel";
import Post from "../models/PostModel";

const createComment = async (req: Request, res: Response) => {
  console.log(req.method);
  try {
    const postId = req.params.id;
    const { user, content, replies } = req.body;

    const comment = await Comments.create({
      post: postId,
      user: user,
      replies: replies,
      content: content,
    });

    let postItem = await Post.findById(postId);

    var preData = postItem?.comments as commentI[];
    console.log(preData);

    const newPost = await Post.findByIdAndUpdate(
      postItem?._id,
      {
        comments: [...preData, comment._id.toString()],
      },
      { new: true }
    );

    console.log(newPost);
    res.status(200).json(comment);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

const deleteComment = async (req: Request, res: Response) => {
  console.log(req.method);
  try {
    const commentId = req.params.id;

    const comment = await Comments.findById(commentId);
    const post: postI = (await Post.findById(comment?.post)) as postI;

    let author: string = post.user as string;

    // either author of post or the commentor itself can delete only
    if (
      comment?.user !== (req as CustomRequest).user._id &&
      author !== (req as CustomRequest).user._id
    ) {
      res.status(500).json({ message: "not authorised to delete comment" });
      return;
    }

    await Comments.findByIdAndDelete(commentId);
    res.status(200).json({ message: "comment deleted" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export { createComment, deleteComment };
