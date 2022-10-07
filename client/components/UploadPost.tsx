import React from "react";
import { BsImage, BsEmojiSmile, BsCalendar } from "react-icons/bs";
import { MdOutlinePoll } from "react-icons/md";
import { GoLocation } from "react-icons/go";
import { AiOutlineFileGif } from "react-icons/ai";

export default function UploadPost() {
  return (
    <div className="flex flex-row my-5 items-start border-2 border-l-0 py-2 px-1">
      <div className="flex-[0.15] flex items-center justify-center">
        <img
          src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
          alt="profile"
          className="object-contain w-1/2"
        />
      </div>
      <div className="flex-[0.85]">
        <textarea
          className="text-gray-500 text-xl my-3 outline-none w-full"
          placeholder="What's happening?"
          wrap="soft"
        />
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-row text-xl text-siteLightBlue gap-4 my-4">
            <BsImage />
            <AiOutlineFileGif />
            <MdOutlinePoll />
            <BsEmojiSmile />
            <BsCalendar />
            <GoLocation />
          </div>
          <div className="btn">Share</div>
        </div>
      </div>
    </div>
  );
}
