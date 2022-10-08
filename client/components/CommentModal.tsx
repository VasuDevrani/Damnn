import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { BsImage, BsEmojiSmile, BsCalendar } from "react-icons/bs";
import { MdOutlinePoll } from "react-icons/md";
import { GoLocation } from "react-icons/go";
import { AiOutlineFileGif } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { IconButton } from "@mui/material";

export default function CommentModal({
  open,
  setOpen,
  userName,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userName: string;
}) {
  const style = {
    position: "absolute",
    top: "30%",
    left: "50%",
    borderRadius: "30px",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 3,
    display: "flex",
    flexDirection: "column",
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(!open)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <IconButton>
              <div className="text-2xl my-2 text-gray-600" onClick={() => setOpen(!open)}>
                <BiArrowBack />
              </div>
            </IconButton>
          </div>
          <div className="flex flex-row items-center justify-start">
            <div className="flex-[0.5]">
              <img
                src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                alt="image"
                className="w-1/2"
              />
            </div>
            <p>
              Replying to{" "}
              <span className="text-siteLightBlue">@{userName}</span>
            </p>
          </div>
          <div className="line w-[1px] h-[30px] bg-gray-700 ml-4 my-2"></div>
          <div className="flex flex-row justify-start">
            <div className="flex-[0.6]">
              <img
                src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                alt="image"
                className="w-1/2"
              />
            </div>
            <textarea
              placeholder="Enter your commentt here"
              className="flex-auto outline-none"
            ></textarea>
          </div>
          <div className="flex flex-row justify-between w-full">
            <div className="flex flex-row text-base text-siteLightBlue gap-4 my-4">
              <BsImage />
              <AiOutlineFileGif />
              <MdOutlinePoll />
              <BsEmojiSmile />
              <BsCalendar />
              <GoLocation />
            </div>
            <div className="btn">Share</div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
