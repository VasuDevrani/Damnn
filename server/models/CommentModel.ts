import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  content: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  replies: { type: Number, default: 0 },
});

const Comments = mongoose.model('Comments', CommentSchema);
export default Comments;