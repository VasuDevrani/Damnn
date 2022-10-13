import React, { useState } from "react";
import { postI } from "../interfaces/postInterface";
import { BsHeart } from "react-icons/bs";
import { IoShareOutline } from "react-icons/io5";
import { AiOutlineComment } from "react-icons/ai";
import { IconButton } from "@mui/material";
import CommentModal from "./CommentModal";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../context/hooks";
import { likePost } from "../slices/PostSlice";
import instance from "../utils/axios";

export default function Post({
  _id,
  name,
  time,
  images,
  content,
  likes,
  comments,
  shares,
}: postI) {
  const [open, setOpen] = useState(false);
  const { userInfo } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLike = async () => {
    const config = {
      headers: { Authorization: `Bearer ${userInfo?.token}` },
    };

    const userId: string = (userInfo ? userInfo._id : "") as string;
    let dupLikes = likes;
    if (dupLikes.includes(userId)) {
      const index = dupLikes.indexOf(userId);
      if (dupLikes.length == 1) {
        dupLikes = [];
      } else {
        dupLikes.splice(index, 1);
      }
    } else dupLikes = [...dupLikes, userId];

    var updateData = {
      comments: comments,
      likes: dupLikes,
    };
    try {      
      const { data } = await instance.put(
        `/post/${_id}`,
        updateData,
        config
      );
    } catch (err: any) {
      console.log(err);
    }

    dispatch(likePost({ postId: _id, userId: userInfo ? userInfo._id : "" }));
  };

  return (
    <div className="mx-2 border-b">
      <div className="flex flex-row cursor-pointer">
        <div className="flex-[0.1]">
          <img
            src={userInfo?.poster_path}
            alt="image"
            className="object-contain w-3/4"
          />
        </div>
        <div className="flex flex-col flex-[0.9] my-2">
          <div
            className="flex gap-2 text-sm"
            onClick={() => router.push(`${_id}`)}
          >
            <p className="font-bold">{name}</p>
            <p className="text-gray-600">{name} -</p>
            <p className="text-gray-600">{time}</p>
          </div>
          <div className="text-sm my-1">{content}</div>
          <div className="my-2">
            {images && images.length > 0 && (
              <div className="flex flex-row gap-2 overflow-scroll">
                {images.map((image) => (
                  <img src={image} alt="images" className="w-60" />
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-row justify-around">
            <div
              className="flex items-center text-sm text-siteBlue"
              onClick={handleLike}
            >
              {likes?.length}
              <IconButton>
                <div className={`text-siteBlue text-base hover:text-pink-600`}>
                  {userInfo && userInfo._id && likes.includes(userInfo._id) ? (
                    "💖"
                  ) : (
                    <BsHeart />
                  )}
                </div>
              </IconButton>
            </div>
            <div className="flex items-center text-sm text-siteBlue">
              {shares}
              <IconButton>
                <div className="text-siteBlue text-base hover:text-green-600">
                  <IoShareOutline />
                </div>
              </IconButton>
            </div>
            <div
              className="flex items-center text-sm text-siteBlue"
              onClick={() => setOpen(!open)}
            >
              {comments?.length}
              <IconButton>
                <div className="text-siteBlue text-base hover:text-violet-600">
                  <AiOutlineComment />
                </div>
              </IconButton>
            </div>
          </div>
        </div>
      </div>
      {/* {comment && <Comment commentData={commentsData} />} */}
      <CommentModal open={open} setOpen={setOpen} userName={name} />
    </div>
  );
}
