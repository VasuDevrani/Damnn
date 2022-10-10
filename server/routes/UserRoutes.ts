import express from "express";
import {
  registerUser,
  updateUser,
  loginUser,
  userDetails,
} from "../controllers/UserController";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.route("/").post(registerUser).put(protect, updateUser);
router.post("/login", loginUser);
router.get("/:id", userDetails);

export default router;
