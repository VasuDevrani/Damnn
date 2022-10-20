import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import { UserI } from "../interfaces/userInterface";
import { ImCross } from "react-icons/im";
import instance from "../utils/axios";
import { useAppSelector } from "../context/hooks";
import { chatI } from "../interfaces/chatInterfaces";

export default function GroupChatModal({
  modal,
  setModal,
  users,
  chatList,
  setChatList
}: {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  users: UserI[];
  chatList: chatI[];
  setChatList: React.Dispatch<React.SetStateAction<chatI[]>>;
}) {
  const [suggest, setSuggest] = useState([...users]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<UserI[]>([]);

  const {userInfo} = useAppSelector((state) => state.user);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch((event?.target as HTMLInputElement).value);
    var data = users.filter((user) => {
      return user.name.includes((event?.target as HTMLInputElement).value);
    });

    for (var i = 0; i < selected.length; i++) {
      data = data.filter((item) => {
        return item._id !== selected[i]._id;
      });
    }
    setSuggest(data);
  };

  const handleAddUser = (user: UserI) => {
    const pre = selected.find((item) => item._id === user._id);

    if (pre) {
      setSelected(
        selected.filter((item) => {
          return item._id !== user._id;
        })
      );
      setSuggest([...suggest, user]);
    } else {
      setSelected([...selected, user]);
      setSuggest(
        suggest.filter((item) => {
          return item._id !== user._id;
        })
      );
    }
  };

  const createGroupChat = async () => {
    if (selected.length < 2) return;

    console.log(selected);
    var data1 = selected.map((item) => (
        item._id
    ))

    var postData = {
      users: data1,
      name: "Group 1"
    }

    console.log(postData);
    const config = {
      headers: { Authorization: `Bearer ${userInfo?.token}` },
    };
    const { data } = await instance.post("/chat/group", postData, config);
    console.log(data);
    setChatList([...chatList, data]);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    borderRadius: "20px",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 3,
    display: "flex",
    flexDirection: "column",
  };
  return (
    <div>
      <Modal
        open={modal}
        onClose={() => setModal(!modal)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex flex-col items-center gap-3">
            <h1 className="text-xl font-semibold">Select at least two users</h1>
            <div className="flex flex-row gap-5 overflow-scroll">
              {selected &&
                selected.map((item) => (
                  <div
                    className="bg-sitegreen flex flex-row items-center gap-3 text-textBlack font-medium p-1 px-3 text-center rounded-3xl cursor-pointer"
                    onClick={() => handleAddUser(item)}
                  >
                    <p>{item.name}</p>
                    <div className="text-base">
                      <ImCross />
                    </div>
                  </div>
                ))}
            </div>
            <div className="flex flex-row w-full p-2 gap-4 items-center relative">
              <input
                type="text"
                className="border-2 p-2 px-4 outline-none rounded-3xl w-full"
                placeholder="Search users"
                value={search}
                onChange={handleChange}
              />
              <div className="btn py-2" onClick={createGroupChat}>
                Create
              </div>
            </div>
            <div className="users"></div>
            <div className="flex flex-col gap-2">
              {suggest.map((user) => (
                <div
                  onClick={() => handleAddUser(user)}
                  className="bg-sitegreen text-textBlack font-medium p-1 px-3 text-center rounded-3xl cursor-pointer"
                >
                  <h1>{user.name}</h1>
                </div>
              ))}
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
