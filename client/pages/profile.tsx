import Head from "next/head";
import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../context/hooks";

export default function Profile() {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.user);
  const { posts } = useAppSelector((state) => state.post);

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <div className="flex flex-row w-full h-[100vh] overflow-scroll">
        <div className="flex flex-col flex-[0.60]">
          <div className="flex flex-row gap-10 w-full items-center bg-white sticky top-0 left-0 px-2">
            <div className="flex items-center text-xl">
              <BiArrowBack />
            </div>
            <div>
              <p className="text-lg font-semibold">{userInfo?.name}</p>
              <p className="text-sm text-siteGray">{posts.length} posts</p>
            </div>
          </div>
          {/* profile intro */}
          <div className="flex flex-col">
            <div className="w-full relative">
              <img
                src="https://pbs.twimg.com/profile_banners/1553669064567898112/1661914172/1500x500"
                alt="background image"
              />
              <img
                src={userInfo?.poster_path}
                alt="profile image"
                className="rounded-full absolute w-48 left-5 -bottom-14 border-4 border-white"
              />
            </div>
            <div className="flex">
              <div className="btn ml-auto p-1 px-4">Edit profile</div>
            </div>
            <div>
              
            </div>
          </div>
        </div>
        <div className="flex flex-[0.40]"></div>
      </div>
    </>
  );
}
