import React, { useState } from "react";
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

export default function PostDetails() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-row w-full h-[100vh] overflow-scroll">
      <div className="flex flex-col m-2 flex-[0.60]">
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
                src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                alt="image"
                className="object-contain w-14"
              />
            </div>
            <div className="">
              <p className="text-sm font-semibold">Vasu Devrani</p>
              <p className="text-sm text-gray-500">@vasudevrani</p>
            </div>
          </div>
          <IoIosMore />
        </div>
        <div className="m-2 my-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
          asperiores tempora id temporibus est, sint tenetur possimus fuga sed
          reiciendis eveniet consequatur dolorum dolor a. Animi, veritatis?
          Dolorem, labore quam?
        </div>
        <div className="text-sm text-gray-600 py-2 mx-2 border-b">
          10:53 PM · Sep 20, 2022 ·Twitter for Android
        </div>
        <p className="text-sm font-semibold py-4 mx-2 border-b">30 likes</p>
        <div className="flex flex-row justify-around items-center my-3 pb-3 border-b">
          <IconButton>
            <div className="text-siteBlue hover:text-pink-600">
              <BsHeart />
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
      </div>
      <div className="flex-[0.4]"></div>
    </div>
  );
}
