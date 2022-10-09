import express from "express";
import {
  registerUser,
  updateUser,
  loginUser,
  userDetails,
  followUser,
  unfollowUser,
} from "../controllers/UserController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser).put(protect, updateUser);
router.post("/login", loginUser);
router.get("/:id", userDetails);
router.get("/follow/:id", protect, followUser);
router.get("/unfollow/:id", protect, unfollowUser);

export default router;
