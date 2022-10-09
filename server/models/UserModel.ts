import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: String, default: "Not provided" },
  password: { type: String, required: true },
  email: { type: String, required: true, trim: true },
  phone: { type: String },
  poster_path: {
    type: String,
    default:
      "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png",
  },
  bg_poster: {
    type: String,
    default:
      "https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2022/05/00-lead-windows-default-wallpaper.jpg",
  },
  address: { type: String, required: true },
  bio: { type: String },
  followings: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const User = mongoose.model("User", UserSchema);
export default User;
