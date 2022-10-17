import React, { useRef, useState } from "react";
import { BsImage, BsEmojiSmile, BsCalendar } from "react-icons/bs";
import { MdOutlinePoll } from "react-icons/md";
import { GoLocation } from "react-icons/go";
import { AiOutlineFileGif } from "react-icons/ai";
import EmojiPicker from "emoji-picker-react";
import instance from "../utils/axios";
import { useAppDispatch, useAppSelector } from "../context/hooks";
import { addNewPost } from "../slices/PostSlice";

export default function UploadPost() {
  const { userInfo } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const file = useRef<HTMLInputElement | null>(null);

  const [inputStr, setInputStr] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [post, setPost] = useState<{ content: string; images: string[] }>({
    content: "",
    images: [],
  });
  const [load, setLoad] = useState(false);

  const inputRef = useRef(null);

  const onEmojiClick = (event: any) => {
    setInputStr((prevInput) => prevInput + event.emoji);
    setPost({ ...post, content: post.content + event.emoji });
    setShowPicker(false);
    if (inputRef) {
    }
    // inputRef.current.focus();
  };

  const addImage = (image: HTMLInputElement) => {
    let img;
    if (image.files) img = image.files[0];
    else return;

    setLoad(true);
    if (img.type === "image/jpeg" || img.type === "image/png") {
      const data = new FormData();
      data.append("file", img);
      data.append("upload_preset", "Garuda");
      data.append("cloud_name", "di5gni2uz");
      fetch("http://api.cloudinary.com/v1_1/di5gni2uz/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setPost({ ...post, images: [...post.images, data.url.toString()] });
          setLoad(false);
        })
        .catch((err) => {
          setLoad(false);
        });
    } else {
      setLoad(false);
    }
  };

  const handleSubmit = async () => {
    if (inputStr.length <= 0 || load) return;

    console.log(post);

    try {
      const config = {
        headers: { Authorization: `Bearer ${userInfo?.token}` },
      };
      const { data } = await instance.post(
        `/post/${userInfo?._id}`,
        post,
        config
      );
      console.log(data);
      dispatch(addNewPost(data));
      reset();
    } catch (err: any) {
      console.log(err.message);
      reset();
    }
  };

  const reset = () => {
    setPost({
      content: "",
      images: [],
    });
  };

  return (
    <div className="flex flex-row my-5 mt-2 items-start border-2 border-l-0 py-2 px-1 relative">
      <div className="flex-[0.15] flex items-center justify-center">
        <img
          src={userInfo?.poster_path}
          alt="profile"
          className="object-contain w-1/2"
        />
      </div>
      <div className="flex-[0.85]">
        <textarea
          ref={inputRef}
          className="text-gray-500 text-xl my-3 outline-none w-full"
          placeholder="What's happening?"
          wrap="soft"
          value={inputStr}
          onChange={(e) => {
            setInputStr(e.target.value);
            setPost({ ...post, content: e.target.value });
          }}
        />
        {post.images.length > 0 && (
          <div className="flex flex-row gap-2 overflow-scroll">
            {post.images.map((image) => (
              <img src={image} alt="images" className="w-60" />
            ))}
          </div>
        )}
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-row text-xl text-siteLightBlue gap-4 my-4">
            <div
              className="cursor-pointer"
              onClick={() => (file.current as HTMLInputElement).click()}
            >
              <BsImage />
            </div>
            <div className="cursor-pointer">
              <AiOutlineFileGif />
            </div>
            <div className="cursor-pointer">
              <MdOutlinePoll />
            </div>
            <div
              onClick={() => setShowPicker((val) => !val)}
              className="cursor-pointer"
            >
              <BsEmojiSmile />
            </div>
            <div className="cursor-pointer">
              <BsCalendar />
            </div>
            <div className="cursor-pointer">
              <GoLocation />
            </div>
          </div>
          <div className="btn" onClick={handleSubmit}>
            {load ? "loading..." : "Share"}
          </div>
          <input
            type="file"
            name="images"
            className="hidden"
            ref={file}
            onChange={(event) => addImage(event.target as HTMLInputElement)}
          />
          {showPicker && (
            <div className="absolute z-50 right-0">
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
