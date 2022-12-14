import React, { useRef, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import EmojiPicker from "emoji-picker-react";
import { BsEmojiSmile, BsImage } from "react-icons/bs";
import { messageData } from "../data/chat";
import { useAppSelector } from "../context/hooks";
import { IconButton, Tooltip } from "@mui/material";

export default function ChatMain({
  chat,
  setChat,
}: {
  chat: string;
  setChat: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [showPicker, setShowPicker] = useState(false);
  const [inputStr, setInputStr] = useState("");

  const { userInfo } = useAppSelector((state) => state.user);

  const [messages, setMessages] = useState(messageData);

  const inputRef = useRef(null);

  const onEmojiClick = (event: any) => {
    setInputStr((prevInput) => prevInput + event.emoji);
    setShowPicker(false);
  };
  return (
    <div className="border-r h-[100vh]">
      {chat.length > 0 ? (
        <div className="flex flex-col justify-between h-[98vh]">
          <div className="flex flex-row gap-5 w-full items-center bg-white sticky top-0 left-0 px-2 border-b-2 pb-3">
            <div
              className="flex items-center text-xl text-gray-700 cursor-pointer"
              onClick={() => setChat("")}
            >
              <Tooltip title="back">
                <IconButton>
                  <BiArrowBack />
                </IconButton>
              </Tooltip>
            </div>
            <div className="text-xl font-bold">{chat}</div>
          </div>
          <div className="overflow-scroll flex flex-col gap-10 flex-1 w-full bg-chatBg rounded-xl py-5">
            {messages &&
              messages.map((item) => (
                <div key={item._id} className="text-base flex px-5">
                  <p
                    className={`border rounded-3xl p-2 px-4 ${
                      item.senderId === userInfo?._id
                        ? "ml-auto bg-green-300"
                        : "bg-red-200"
                    }`}
                  >
                    {item.content}
                  </p>
                </div>
              ))}
            {messages &&
              messages.map((item) => (
                <div key={item._id} className="text-base flex px-5">
                  <p
                    className={`border rounded-3xl p-2 ${
                      item.senderId === userInfo?._id
                        ? "ml-auto bg-green-300"
                        : "bg-red-200"
                    }`}
                  >
                    {item.content}
                  </p>
                </div>
              ))}
          </div>
          <div className="flex flex-row w-full p-2 gap-4 items-center relative">
            <div
              onClick={() => setShowPicker((val) => !val)}
              className="cursor-pointer flex-1 text-xl"
            >
              <BsEmojiSmile />
            </div>
            <div className="cursor-pointer flex-1 text-xl">
              <BsImage />
            </div>
            <input
              type="text"
              placeholder="Enter message here"
              className="border-2 p-2 px-4 outline-none rounded-3xl w-full"
              value={inputStr}
              onChange={(e) => {
                setInputStr(e.target.value);
              }}
            />
            <div className="btn py-2">Send</div>
            {showPicker && (
              <div className="absolute z-50 bottom-20 right-0">
                <EmojiPicker onEmojiClick={onEmojiClick} />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-3 w-full h-[100vh]">
          <p className="text-4xl font-semibold">Select a chat</p>
          <p className="text-xl">or,</p>
          <p className="btn py-2">CREATE ONE</p>
        </div>
      )}
    </div>
  );
}
