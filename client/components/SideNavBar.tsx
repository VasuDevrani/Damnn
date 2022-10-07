import React from "react";
import { BsHouse, BsHash, BsBell, BsList, BsPerson } from "react-icons/bs";
import { FaCamera } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import { BsChatDots } from "react-icons/bs";
import { useRouter } from "next/router";

export default function SideNavBar() {
  const router = useRouter();

  return (
    <div className="flex flex-col w-[15rem] border-r-2 border-r-siteGray p-3 border-opacity-20 gap-3 cursor-pointer">
      <div className="text-siteLightBlue text-3xl pl-5">
        <FaCamera />
      </div>
      <div className="sideNav-list-item" onClick={() => router.push('/')}>
        <div>
          <BsHouse />
          <p>Home</p>
        </div>
      </div>
      <div className="sideNav-list-item" onClick={() => router.push('/explore')}>
        <div>
          <BsHash />
          <p>Explore</p>
        </div>
      </div>
      <div className="sideNav-list-item" onClick={() => router.push('/notifs')}>
        <div>
          <BsBell />
          <p>Notifications</p>
        </div>
      </div>
      <div className="sideNav-list-item" onClick={() => router.push('/chat')}>
        <div>
          <BsChatDots />
          <p>Messages</p>
        </div>
      </div>
      <div className="sideNav-list-item" onClick={() => router.push('/bookMarks')}>
        <div>
          <BsList />
          <p>BookMarks</p>
        </div>
      </div>
      <div className="sideNav-list-item" onClick={() => router.push('/profile')}>
        <div>
          <BsPerson />
          <p>Profile</p>
        </div>
      </div>
      <div className="sideNav-list-item" onClick={() => router.push('/more')}>
        <div>
          <IoIosMore />
          <p>More</p>
        </div>
      </div>
    </div>
  );
}
