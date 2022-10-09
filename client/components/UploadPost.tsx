import React, { useRef, useState } from "react";
import { BsImage, BsEmojiSmile, BsCalendar } from "react-icons/bs";
import { MdOutlinePoll } from "react-icons/md";
import { GoLocation } from "react-icons/go";
import { AiOutlineFileGif } from "react-icons/ai";
import EmojiPicker from "emoji-picker-react";

export default function UploadPost() {
  const [inputStr, setInputStr] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const inputRef = useRef(null);

  const onEmojiClick = (event: any) => {
    console.log(event);
    setInputStr((prevInput) => prevInput + event.emoji);
    setShowPicker(false);
    if (inputRef) {
    }
    // inputRef.current.focus();
  };
  return (
    <div className="flex flex-row my-5 mt-2 items-start border-2 border-l-0 py-2 px-1 relative">
      <div className="flex-[0.15] flex items-center justify-center">
        <img
          src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
          alt="profile"
          className="object-contain w-1/2"
        />
      </div>
      <div className="flex-[0.85]">
        <textarea
          ref={inputRef}
          className="text-gray-500 text-xl my-3 outline-none w-full"
          placeholder="What's happening?"
          wrap="soft"
          value={inputStr}
          onChange={(e) => setInputStr(e.target.value)}
        />
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-row text-xl text-siteLightBlue gap-4 my-4">
            <div className="cursor-pointer">
              <BsImage />
            </div>
            <div className="cursor-pointer">
              <AiOutlineFileGif />
            </div>
            <div className="cursor-pointer">
              <MdOutlinePoll />
            </div>
            <div
              onClick={() => setShowPicker((val) => !val)}
              className="cursor-pointer"
            >
              <BsEmojiSmile />
            </div>
            <div className="cursor-pointer">
              <BsCalendar />
            </div>
            <div className="cursor-pointer">
              <GoLocation />
            </div>
          </div>
          <div className="btn">Share</div>
          {showPicker && (
            <div className="absolute z-50 right-0">
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
