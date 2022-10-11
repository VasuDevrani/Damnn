import express from "express";
import { createComment, deleteComment } from "../controllers/CommentController";

const router = express.Router();

router.route('/:id').post(createComment).delete(deleteComment);

export default router;