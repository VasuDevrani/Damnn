import React, { useState } from "react";
import { postI } from "../interfaces/postInterface";
import { BsHeart } from "react-icons/bs";
import { IoShareOutline } from "react-icons/io5";
import { AiOutlineComment } from "react-icons/ai";
import { IconButton } from "@mui/material";
import CommentModal from "./CommentModal";
import { useRouter } from "next/router";

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

  const router = useRouter();

  return (
    <div className="mx-2 border-b">
      <div className="flex flex-row cursor-pointer">
        <div className="flex-[0.1]">
          <img
            src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
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
            <div className="flex items-center text-sm text-siteBlue">
              {likes}
              <IconButton>
                <div className="text-siteBlue text-base hover:text-pink-600">
                  <BsHeart />
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
