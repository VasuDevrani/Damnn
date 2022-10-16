import React, { useEffect, useRef, useState } from "react";
import { BsHouse, BsHash, BsBell, BsList, BsPerson } from "react-icons/bs";
import { FaCamera } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import { BsChatDots } from "react-icons/bs";
import { useRouter } from "next/router";
import { useAppSelector, useAppDispatch } from "../context/hooks";
import { reset } from "../slices/UserSlice";

export default function SideNavBar() {
  const router = useRouter();
  const { userInfo } = useAppSelector((state) => state.user);

  const ref = useRef<any>();
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();

  // show not show function
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !(ref.current as HTMLElement).contains(event.target)) {
        setShow(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const handleLogout = () => {
    dispatch(reset());
    router.push('/')
  };

  return (
    <div className="flex flex-col w-[15rem] border-r-2 border-r-siteGray p-3 border-opacity-20 gap-3 cursor-pointer">
      <div className="text-siteLightBlue text-3xl pl-5">
        <FaCamera />
      </div>
      <div className="sideNav-list-item" onClick={() => router.push("/")}>
        <div>
          <BsHouse />
          <p>Home</p>
        </div>
      </div>
      <div
        className="sideNav-list-item"
        onClick={() => router.push("/explore")}
      >
        <div>
          <BsHash />
          <p>Explore</p>
        </div>
      </div>
      <div className="sideNav-list-item" onClick={() => router.push("/notifs")}>
        <div>
          <BsBell />
          <p>Notifications</p>
        </div>
      </div>
      <div className="sideNav-list-item" onClick={() => router.push("/chat")}>
        <div>
          <BsChatDots />
          <p>Messages</p>
        </div>
      </div>
      <div
        className="sideNav-list-item"
        onClick={() => router.push("/bookMarks")}
      >
        <div>
          <BsList />
          <p>BookMarks</p>
        </div>
      </div>
      <div
        className="sideNav-list-item"
        onClick={() => router.push("/profile")}
      >
        <div>
          <BsPerson />
          <p>Profile</p>
        </div>
      </div>
      <div className="sideNav-list-item" onClick={() => router.push("/more")}>
        <div>
          <IoIosMore />
          <p>More</p>
        </div>
      </div>
      <div className="btn py-3">Share</div>
      <div className="flex flex-row justify-between items-center mt-14 hover:bg-gray-200 p-3 py-2 w-full rounded-3xl relative">
        {show ? (
          <div
            className="flex flex-col absolute -top-40 shadow-xl left-0 bg-white p-3 rounded-xl w-[15rem] items-center"
            ref={ref}
          >
            <div className="flex flex-row w-full justify-between">
              <div className="flex flex-row gap-3 border-b py-2">
                <img src={userInfo?.poster_path} alt="" className="w-10" />
                <p className="text-sm font-semibold">{userInfo?.name}</p>
              </div>
              <div>
                <IoIosMore />
              </div>
            </div>
            <div className="w-full text-sm gap-3 flex flex-col my-2">
              <div className="border-b py-2" onClick={handleLogout}>
                Log Out
              </div>
              <p>SwitchProfile</p>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="flex flex-row gap-3" onClick={() => setShow(!show)}>
          <img
            src={userInfo?.poster_path}
            alt=""
            className="w-10"
            onClick={() => setShow(!show)}
          />
          <div className="text-sm font-semibold" onClick={() => setShow(!show)}>
            {userInfo?.name}
          </div>
        </div>
        <div>
          <IoIosMore />
        </div>
      </div>
    </div>
  );
}
