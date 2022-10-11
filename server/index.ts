import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

import UserRoutes from './routes/UserRoutes'
import PostRoutes from './routes/PostRoute'
import CommentRoutes from './routes/CommentRoute'

const mongoURL = process.env.MONGO_URL;

mongoose
  .connect(mongoURL ? mongoURL : "")
  .then(() => {
    console.log("app connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

app.use('/user', UserRoutes);
app.use('/post', PostRoutes);
app.use('/comment', CommentRoutes);

app.listen(process.env.PORT, () => {
  console.log(`server listening to port ${process.env.PORT}`);
});