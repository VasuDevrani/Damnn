import { Request, Response } from "express";
import { CustomRequest } from "../middlewares/authMiddleware";
import Chat from "../models/ChatModel";
import User from "../models/UserModel";

// when loggedIn user selects another user, it creates a new chat or gets a prev created chat
export const accessChat = async (req: Request, res: Response) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).send("error");
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      // for matching the elements in the array, as per positions elemMatch is used
      { users: { $elemMatch: { $eq: (req as CustomRequest).user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  var finalChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (finalChat.length > 0) {
    res.send(finalChat[0]);
  } else {
    const otherUser = await User.findById(userId);

    var chatData = {
      chatName: otherUser ? otherUser.name : "",
      isGroupChat: false,
      users: [(req as CustomRequest).user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(FullChat);
    } catch (error: any) {
      res.status(500);
      throw new Error(error.message);
    }
  }
};

export const fetchChats = async (req: Request, res: Response) => {
  try {
    // finding all chats of logged in user
    Chat.find({
      users: { $elemMatch: { $eq: (req as CustomRequest).user._id } },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        var data = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.status(200).send(data);
      });
  } catch (error: any) {
    res.status(500);
    throw new Error(error.message);
  }
};

export const createGroupChat = async (req: Request, res: Response) => {
  const {users, name} = req.body;
  if (!users || !name) {
    return res.status(500).send({ message: "Please Fill all the fields" });
  }
  if (users.length < 2) {
    return res
      .status(500)
      .send("More than 2 users are required to form a group chat");
  }

  users.push((req as CustomRequest).user);

  try {
    const groupChat = await Chat.create({
      chatName: name,
      users: users,
      isGroupChat: true,
      groupAdmin: (req as CustomRequest).user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error: any) {
    res.status(500);
    throw new Error(error.message);
  }
};

export const addToGroup = async (req: Request, res: Response) => {
  const { chatId, userId } = req.body;
  // check if the requester is admin
  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(removed);
  }
};
