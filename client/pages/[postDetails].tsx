import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import { BiArrowBack } from "react-icons/bi";
import { IoIosMore } from "react-icons/io";
import { useRouter } from "next/router";
import { BsHeart } from "react-icons/bs";
import { IoShareOutline } from "react-icons/io5";
import { BsImage, BsEmojiSmile, BsCalendar } from "react-icons/bs";
import { MdOutlinePoll } from "react-icons/md";
import { GoLocation } from "react-icons/go";
import { AiOutlineFileGif } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../context/hooks";
import { commentI, postI } from "../interfaces/postInterface";
import Loader from "../components/Loader";
import { likePost } from "../slices/PostSlice";
import instance from "../utils/axios";

export default function PostDetails() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [postData, setPostData] = useState<postI | null>(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  const { userInfo } = useAppSelector((state) => state.user);
  const { posts } = useAppSelector((state) => state.post);

  useEffect(() => {
    const getData = () => {
      setLoading(true);
      var post: postI = posts.find((post: postI) => {
        return post._id === router.query.postDetails;
      }) as postI;
      setPostData(post);
      setLoading(false);
    };

    getData();
  });

  const handleLike = async () => {
    if (postData) {
      const config = {
        headers: { Authorization: `Bearer ${userInfo?.token}` },
      };

      const userId: string = (userInfo ? userInfo._id : "") as string;
      let dupLikes = postData?.likes;
      if (dupLikes.includes(userId)) {
        const index = dupLikes.indexOf(userId);
        if (dupLikes.length == 1) {
          dupLikes = [];
        } else {
          dupLikes.splice(index, 1);
        }
      } else dupLikes = [...dupLikes, userId];

      var updateData = {
        comments: postData?.comments,
        likes: dupLikes,
      };
      try {
        const { data } = await instance.put(
          `/post/${postData._id}`,
          updateData,
          config
        );
      } catch (err: any) {
        console.log(err);
      }

      dispatch(
        likePost({
          postId: postData?._id,
          userId: userInfo ? userInfo._id : "",
        })
      );
    }
  };

  return (
    <div className="flex flex-row w-full h-[100vh] overflow-scroll">
      <div className="flex flex-col m-2 flex-[0.60]">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div
              className="flex flex-row gap-5 text-xl items-center"
              onClick={() => router.push("/")}
            >
              <IconButton>
                <BiArrowBack />
              </IconButton>
              <p className="font-semibold">Post</p>
            </div>
            <div className="flex m-2 items-center justify-between">
              <div className="flex flex-row items-center gap-3">
                <div>
                  <img
                    src={
                      postData && postData.user
                        ? postData?.user.poster_path
                        : ""
                    }
                    alt="image"
                    className="object-contain w-14"
                  />
                </div>
                <div className="">
                  <p className="text-sm font-semibold">
                    {postData && postData.user && postData?.user.name}
                  </p>
                  <p className="text-sm text-gray-500">@vasudevrani</p>
                </div>
              </div>
              <IoIosMore />
            </div>
            <div className="m-2 my-3">{postData?.content}</div>
            <div className="my-2">
              {postData && postData.images && postData.images.length > 0 && (
                <div className="flex flex-row gap-2 overflow-scroll">
                  {postData.images.map((image) => (
                    <img src={image} alt="images" className="w-60" />
                  ))}
                </div>
              )}
            </div>
            <div className="text-sm text-gray-600 py-2 mx-2 border-b">
              10:53 PM ?? Sep 20, 2022 ??Twitter for Android
            </div>
            <p className="text-sm font-semibold py-4 mx-2 border-b">
              {postData?.likes.length} likes
            </p>
            <div
              className="flex flex-row justify-around items-center my-3 pb-3 border-b"
              onClick={handleLike}
            >
              <IconButton>
                <div className="text-siteBlue hover:text-pink-600">
                  {userInfo &&
                  userInfo._id &&
                  postData &&
                  postData.likes.includes(userInfo._id) ? (
                    "????"
                  ) : (
                    <BsHeart />
                  )}
                </div>
              </IconButton>
              <IconButton>
                <div className="text-siteBlue hover:text-green-600">
                  <IoShareOutline />
                </div>
              </IconButton>
            </div>
            <div
              className="flex flex-row m-2 gap-3 items-center"
              onClick={() => setOpen(true)}
            >
              <div>
                <img
                  src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                  alt="image"
                  className="object-contain w-14"
                />
              </div>
              <div className="flex flex-col flex-1 gap-2">
                {open && (
                  <h1 className="text-sm text-gray-600">
                    Replying to{" "}
                    <span className="text-siteLightBlue">@vasudevrani</span>
                  </h1>
                )}
                <textarea
                  placeholder="Enter your commentt here"
                  className="flex-auto outline-none"
                ></textarea>
                {open && (
                  <div className="flex flex-row justify-between w-full">
                    <div className="flex flex-row text-base text-siteLightBlue gap-4 my-4">
                      <BsImage />
                      <AiOutlineFileGif />
                      <MdOutlinePoll />
                      <BsEmojiSmile />
                      <BsCalendar />
                      <GoLocation />
                    </div>
                    <div className="btn">Share</div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col items-start gap-2">
              {postData &&
                postData.comments &&
                postData.comments.map((comment: commentI) => (
                  <p>{comment.content}</p>
                ))}
            </div>
          </>
        )}
      </div>
      <div className="flex-[0.4]"></div>
    </div>
  );
}
