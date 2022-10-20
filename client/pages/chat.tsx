import Head from "next/head";
import React, { useEffect, useState } from "react";
import ChatList from "../components/ChatList";
import ChatMain from "../components/ChatMain";
import { io, Socket } from "socket.io-client";
import { useAppSelector } from "../context/hooks";
import instance from "../utils/axios";
import { chatI, messageI } from "../interfaces/chatInterfaces";

const ENDPOINT = "http://localhost:5000";
var socket: any, selectedChatCompare;

export default function Chat() {
  const { userInfo } = useAppSelector((state) => state.user);

  const [chat, setChat] = useState<chatI | null>(null);
  const [chatList, setChatList] = useState<chatI[]>([]);
  const [socketCon, setSocketCon] = useState(false);
  const [messages, setMessages] = useState<messageI[]>([]);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", userInfo);
    socket.on("connection", () => setSocketCon(true));

    const config = {
      headers: { Authorization: `Bearer ${userInfo?.token}` },
    };

    const fetchChats = async () => {
      const { data } = await instance.get("/chat", config);
      setChatList(data);
    };

    fetchChats();
  }, []);

  const joinRoom = async (id: string) => {
    const config = {
      headers: { Authorization: `Bearer ${userInfo?.token}` },
    };
    var { data } = await instance.post("/chat", { userId: id }, config);

    var isPresent = chatList.find((item) => item._id === data._id);

    if (isPresent) {
      return;
    } else {
      setChatList([...chatList, data]);
      setChat(data);

      signalRoomJoin(data._id);
      var chat = data;
      var { data } = await instance.get(`/msg/${chat._id}`, config);
      console.log(data);
      setMessages(data);
    }
  };

  const signalRoomJoin = ({ id }: { id: string }) => {
    socket.emit("join_chat", { roomId: id });
  };

  useEffect(() => {
    socket.on("message received", (newMsg: any) => {
      console.log(newMsg);
      setMessages([...messages, newMsg]);
    });
  });

  const sendMsg = (data: messageI) => {
    socket.emit("new_msg", data);
  };

  return (
    <>
      <Head>
        <title>Messages</title>
      </Head>
      <div className="flex flex-row w-full h-[100vh] overflow-scroll">
        <div className="flex flex-col m-2 flex-[0.60]">
          <ChatMain
            chat={chat}
            setChat={setChat}
            messages={messages}
            setMessages={setMessages}
            sendMsg={sendMsg}
          />
        </div>
        <div className="flex flex-[0.40]">
          {/* chats list */}
          <ChatList
            chat={chat}
            setChat={setChat}
            joinRoom={joinRoom}
            chatList={chatList}
            signalRoomJoin={signalRoomJoin}
            setMessages={setMessages}
            setChatList={setChatList}
          />
        </div>
      </div>
    </>
  );
}
