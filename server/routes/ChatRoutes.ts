import express from "express";
import { accessChat, addToGroup, createGroupChat, fetchChats } from "../controllers/ChatController";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

// create 1-1 chat
router.route("/").post(protect, accessChat);
// get all user chats
router.route("/").get(protect, fetchChats);
router.route("/group").post(protect, createGroupChat);
// router.route("/rename").put(protect, renameG);
// router.route("/groupremove").put(protect, removeFromGroup);
router.route("/groupadd").put(protect, addToGroup);

export default router;