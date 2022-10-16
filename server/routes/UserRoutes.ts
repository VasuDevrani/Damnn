import express from "express";
import {
  registerUser,
  updateUser,
  loginUser,
  userDetails,
  userDataByEmail,
  getPopularUsers,
  updateFollow,
} from "../controllers/UserController";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

router
  .route("/")
  .post(registerUser)
  .put(protect, updateUser)
  .get(protect, getPopularUsers);
router.post("/login", loginUser);
router.get("/:id", userDetails);
router.route("/dt").post(userDataByEmail).put(protect, updateFollow);

export default router;
