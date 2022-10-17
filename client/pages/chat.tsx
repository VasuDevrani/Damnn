import Head from "next/head";
import React, { useState } from "react";
import ChatList from "../components/ChatList";
import ChatMain from "../components/ChatMain";

export default function Chat() {
  const [chat, setChat] = useState('');

  return (
    <>
      <Head>
        <title>Messages</title>
      </Head>
      <div className="flex flex-row w-full h-[100vh] overflow-scroll">
        <div className="flex flex-col m-2 flex-[0.60]">
          <ChatMain chat={chat} setChat={setChat}/>
        </div>
        <div className="flex flex-[0.40]">
          {/* chats list */}
          <ChatList chat={chat} setChat={setChat}/>
        </div>
      </div>
    </>
  );
}
