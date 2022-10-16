import Head from "next/head";
import React from "react";

export default function Chat() {
  
  return (
    <>
      <Head>
        <title>Messages</title>
      </Head>
      <div className="flex flex-row w-full h-[100vh] overflow-scroll">
        <div className="flex flex-col m-2 flex-[0.60]"></div>
        <div className="flex flex-[0.40]"></div>
      </div>
    </>
  );
}
