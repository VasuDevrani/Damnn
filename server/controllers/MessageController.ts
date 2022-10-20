import { Request, Response } from "express";
import { CustomRequest } from "../middlewares/authMiddleware";
import Chat from "../models/ChatModel";
import Message from "../models/MessageModel";
import User from "../models/UserModel";

const allMessages = async (req: Request, res: Response) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.json(messages);
  } catch (error: any) {
    res.status(400);
    throw new Error(error.message);
  }
};

const sendMessage = async (req: Request, res: Response) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: (req as CustomRequest).user._id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "name pic"); //populate the fields of sender with name and pic
    let msg = await message.populate("chat");
    let finalMessage = await User.populate(msg, {
      path: "chat.users",
      select: "name pic email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: finalMessage,
    });

    res.json(message);
  } catch (error: any) {
    res.status(400);
    throw new Error(error.message);
  }
};

export { allMessages, sendMessage };
