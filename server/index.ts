import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

import UserRoutes from "./routes/UserRoutes";
import PostRoutes from "./routes/PostRoute";
import CommentRoutes from "./routes/CommentRoute";
import MessageRoutes from "./routes/MessageRoutes";
import ChatRoutes from "./routes/ChatRoutes";

const mongoURL = process.env.MONGO_URL;

mongoose
  .connect(mongoURL ? mongoURL : "")
  .then(() => {
    console.log("app connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/user", UserRoutes);
app.use("/post", PostRoutes);
app.use("/comment", CommentRoutes);
app.use("/chat", ChatRoutes);
app.use("/msg", MessageRoutes);

import http from "http";
import { Server } from "socket.io";
import { UserI } from "./interfaces/interface";

const server: http.Server<
  typeof http.IncomingMessage,
  typeof http.ServerResponse
> = http.createServer(app);

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("connected to sockets");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join_chat", ({ roomId }) => {
    console.log("User joined room: ", roomId);
    socket.join(roomId);
  });

  socket.on("new_msg", (newMsg) => {
    var chat = newMsg.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user: UserI) => {
      if(user._id === newMsg.sender._id)
        return;
      socket
        .in(user && user._id ? user._id : "")
        .emit("message received", newMsg);
    });
  });
});

server.listen(process.env.PORT, () => {
  console.log(`app connected to ${process.env.PORT}`);
});
