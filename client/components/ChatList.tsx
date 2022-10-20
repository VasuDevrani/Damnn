import React, { useEffect, useState } from "react";
// import { chatList } from "../data/chat";
import { FaCloud } from "react-icons/fa";
import instance from "../utils/axios";
import { useAppSelector } from "../context/hooks";
import { UserI } from "../interfaces/userInterface";
import { chatI, messageI } from "../interfaces/chatInterfaces";

export default function ChatList({
  chat,
  setChat,
  joinRoom,
  chatList,
  signalRoomJoin,
  setMessages,
}: {
  chat: chatI | null;
  setChat: React.Dispatch<React.SetStateAction<chatI | null>>;
  joinRoom: (id: string) => void;
  chatList: chatI[];
  signalRoomJoin: (arg: { id: string }) => void;
  setMessages: React.Dispatch<React.SetStateAction<messageI[]>>;
}) {
  const { userInfo } = useAppSelector((state) => state.user);

  const [users, setUsers] = useState<UserI[]>([]);

  useEffect(() => {
    const getData = async () => {
      const config = {
        headers: { Authorization: `Bearer ${userInfo?.token}` },
      };
      try {
        let { data } = await instance.get("/user/", config);

        data = data.filter((item: UserI) => {
          return item._id !== userInfo?._id;
        });
        setUsers(data);
      } catch (err: any) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const handleChat = async (chat: chatI) => {
    setChat(chat);
    signalRoomJoin({ id: chat._id ? chat._id : "" });

    const config = {
      headers: { Authorization: `Bearer ${userInfo?.token}` },
    };
    var { data } = await instance.get(`/msg/${chat._id}`, config);
    console.log(data);
    setMessages(data);
  };

  return (
    <div className="flex flex-col w-full h-[100vh] overflow-scroll">
      <div className="p-2 bg-white flex flex-row gap-3 items-center border-b-2">
        <div className="text-2xl text-siteLightBlue">
          <FaCloud />
        </div>
        <h1 className="text-xl font-bold">Chat List</h1>
      </div>
      {/* fetched chats 1:1 and group */}
      <div className=" mt-3 flex flex-col gap-3">
        {chatList.map((chat) => (
          <div
            key={chat._id}
            className="flex-1 border-2 p-1 px-5 cursor-pointer hover:bg-gray-200 shadow-md rounded-3xl"
            onClick={() => handleChat(chat)}
          >
            <p className="text-base font-semibold">
              {chat.users[0].name === userInfo?.name
                ? chat.users[1].name
                : chat.users[0].name}
            </p>
            <div className="text-sm">Users: {chat.users.length}</div>
          </div>
        ))}
      </div>
      <div className="line h-[2px] w-full bg-siteGray my-5"></div>
      {/* all users */}
      <div className="flex flex-col gap-3 ml-3">
        <p className="text-xl font-bold">Start a Chat</p>
        {/* create group chat btn */}
        <div className="btn py-2 my-3">Create Group Chat</div>
        {users.length > 0 && (
          <div className="flex flex-col gap-3 mb-10">
            {users.map((user) => (
              <div
                key={user._id}
                className="flex-1 border-2 p-1 px-5 cursor-pointer hover:bg-gray-200 shadow-md rounded-3xl"
                onClick={() => {
                  joinRoom(user._id ? user._id : "");
                }}
              >
                {user.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
