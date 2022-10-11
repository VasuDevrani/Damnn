import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String },
  image: [String],
  date: { type: Date, default: Date.now() },
  likes: { type: Number, default: 0 },
  shares: { type: Number, default: 0 },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comments" }],
});

const Post = mongoose.model("Post", PostSchema);
export default Post;
