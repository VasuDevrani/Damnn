import React, { useEffect, useState } from "react";
import { useAppSelector } from "../context/hooks";
import { UserI } from "../interfaces/userInterface";
import instance from "../utils/axios";
import Loader from "./Loader";

export default function ForFollow() {
  const { userInfo } = useAppSelector((state) => state.user);

  const [users, setUsers] = useState<UserI[]>([]);

  useEffect(() => {
    const getData = async () => {
      const config = {
        headers: { Authorization: `Bearer ${userInfo?.token}` },
      };
      const { data } = await instance.get("/user/", config);
      console.log(data);

      setUsers(data);
    };
    getData();
  }, []);
  return (
    <>
      {users.length <= 0 ? (
        <Loader />
      ) : (
        <>
          <div className="flex items-center flex-col w-full">
            {users.map((user: UserI) => (
              <div className="flex flex-row gap-3 items-center justify-around w-full">
                <div className="flex gap-3">
                  <img src={userInfo?.poster_path} alt="" className="w-10" />
                  <div className="text-sm font-semibold">{userInfo?.name}</div>
                </div>
                <div className="btn py-1">Follow</div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
