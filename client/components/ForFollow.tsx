import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../context/hooks";
import { UserI } from "../interfaces/userInterface";
import { followUser } from "../slices/UserSlice";
import instance from "../utils/axios";
import Loader from "./Loader";

export default function ForFollow() {
  const { userInfo } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

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
        })
        setUsers(data);
      } catch (err: any) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const followUserFunc = (id: string) => {
    const data = {
      userInfo: userInfo as UserI,
      id: id,
    };
    dispatch(followUser(data));
  };

  return (
    <>
      {users.length <= 0 ? (
        <Loader />
      ) : (
        <>
          <div className="flex items-center flex-col w-full">
            {users.map((user: UserI) => (
              <div className="flex flex-row mx-3 items-center justify-between w-full">
                <div className="flex gap-3">
                  <img src={userInfo?.poster_path} alt="" className="w-10" />
                  <div className="text-sm font-semibold">{user?.name}</div>
                </div>
                <div
                  className="btn py-1"
                  onClick={() => followUserFunc(user._id ? user._id : "")}
                >
                  {userInfo &&
                  userInfo?.followings &&
                  userInfo.followings.includes(user._id ? user._id : "")
                    ? "Following"
                    : "follow"}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
