import express from "express";
import {
  createPost,
  deletePost,
  getselfPost,
  getTimelinePost,
  updatePost,
} from "../controllers/PostController";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

router
  .route("/:id")
  .get(protect, getTimelinePost)
  .post(protect, createPost)
  .put(protect, updatePost)
  .delete(protect, deletePost);
router.get("/:id/self", protect, getselfPost);

export default router;
