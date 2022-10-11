import { Button, IconButton } from "@mui/material";
import React, { FormEvent, useEffect, useState } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { BiArrowBack } from "react-icons/bi";
import { FaCamera, FaImage } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../context/hooks";
import { register, reset } from "../slices/UserSlice";
import { useRouter } from "next/router";
import Head from "next/head";

// firebase
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebaseConfig";

export default function RegisterEmailModal({
  modal2,
  setModal2,
}: {
  modal2: boolean;
  setModal2: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    borderRadius: "20px",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 3,
    display: "flex",
    flexDirection: "column",
  };

  const { isLoading, isSuccess, isError, message } = useAppSelector(
    (state) => state.user
  );
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    address: "",
    phone: "",
    name: "",
    dob: "",
    bio: "",
    confirmPassword: "",
    poster_path: "",
    bg_poster: "",
  });
  const [load, setLoad] = useState(false);
  const [page, setPage] = useState(1);
  const [disable, setDisable] = useState(true);

  const handleSubmit = (event: FormEvent<Element>) => {
    event.preventDefault();
    setPage(page + 1);
  };

  const handleChange = (event: FormEvent<Element>) => {
    setFormData({
      ...formData,
      [(event.target as HTMLInputElement).name]: (
        event.target as HTMLInputElement
      ).value,
    });
  };

  const auth = getAuth(app);
  const handleRegister = () => {
    if (page === 3) {
      if (formData.password !== formData.confirmPassword) {
        window.alert("passwords didn't match");
        return;
      } else {
        const { confirmPassword, ...data } = formData;
        createUserWithEmailAndPassword(auth, data.email, data.password)
          .then((res) => {
            dispatch(register(data));
          })
          .catch((err) => {
            console.log(err);
          });
      }
      return;
    }
    setPage(page < 3 ? page + 1 : 1);
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
          setFormData({ ...formData, poster_path: data.url.toString() });
          setLoad(false);
        })
        .catch((err) => {
          setLoad(false);
        });
    } else {
      setLoad(false);
    }
  };

  const handleClose = () => {
    setPage(1);
    resetData();
    setModal2(!modal2);
  };

  const resetData = () => {
    setFormData({
      email: "",
      password: "",
      address: "",
      phone: "",
      name: "",
      dob: "",
      bio: "",
      confirmPassword: "",
      poster_path: "",
      bg_poster: "",
    });
  };

  useEffect(() => {
    if (formData.email.length > 0 && formData.password.length > 0)
      setDisable(false);
    else setDisable(true);
  }, [formData.email, formData.password]);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (isSuccess) {
      router.push("/");
    }

    dispatch(reset());
  }, [formData, isError, message, router, dispatch]);

  return (
    <>
      <Head>
        <title>Damnn | auth</title>
      </Head>
      <div>
        <Modal
          open={modal2}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {page === 1 ? (
              <div className="flex flex-col items-center justify-center gap-5 relative">
                <div
                  className="absolute top-0 left-0 text-2xl cursor-pointer"
                  onClick={() => setModal2(!modal2)}
                >
                  <IconButton>
                    <BiArrowBack />
                  </IconButton>
                </div>
                <div className="text-siteLightBlue text-3xl">
                  <FaCamera />
                </div>
                <p className="text-3xl font-bold">Sign Up to Damnn</p>

                <div className="flex flex-col gap-2">
                  <ValidatorForm
                    onSubmit={(event: FormEvent<Element>) =>
                      handleSubmit(event)
                    }
                  >
                    <TextValidator
                      label="Email"
                      onChange={handleChange}
                      name="email"
                      value={formData.email}
                      validators={["required", "isEmail"]}
                      errorMessages={[
                        "this field is required",
                        "email is not valid",
                      ]}
                    />
                    <br />
                    <TextValidator
                      label="Password"
                      onChange={handleChange}
                      name="password"
                      value={formData.password}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                    <br />
                    <TextValidator
                      label="Confirm Password"
                      onChange={handleChange}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                    <br />
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      sx={{ width: "100%", margin: "auto" }}
                      disabled={disable}
                    >
                      next
                    </Button>
                  </ValidatorForm>
                </div>
              </div>
            ) : page === 2 ? (
              <div className="flex flex-col gap-5 items-center justify-start my-5">
                <h1 className="text-3xl font-bold">
                  Welcome! Lets know each other
                </h1>
                <div className="text-siteLightBlue text-3xl">
                  <FaCamera />
                </div>
                <div className="border-2 border-gray-500 p-2 rounded-3xl w-[70%]">
                  <input
                    type="text"
                    placeholder="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="outline-none px-2 w-full"
                  />
                </div>
                <div className="border-2 border-gray-500 p-2 rounded-3xl w-[70%]">
                  <input
                    type="text"
                    placeholder="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="outline-none px-2 w-full"
                  />
                </div>
                <div className="border-2 border-gray-500 p-2 rounded-3xl w-[70%]">
                  <input
                    type="text"
                    placeholder="Your address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="outline-none px-2 w-full"
                  />
                </div>
                <div className="border-2 border-gray-500 p-2 rounded-3xl w-[70%]">
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="outline-none px-2 w-full"
                  />
                </div>
              </div>
            ) : page === 3 ? (
              <div className="flex flex-col my-3">
                <p className="text-2xl font-bold mb-5">Add a bio: </p>
                <div className="border border-black p-2">
                  <textarea
                    name="bio"
                    className="w-full outline-none"
                    cols={30}
                    rows={10}
                    value={formData.bio}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="my-2 rounded-3xl w-[70%] flex flex-col">
                  <label
                    htmlFor="imageFile"
                    className="text-black text-xl flex gap-2 items-center my-2"
                  >
                    <FaImage /> Add profile image :{" "}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="outline-none px-2 w-full"
                    onChange={(event) =>
                      addImage(event.target as HTMLInputElement)
                    }
                  />
                </div>
                <div className="my-2 rounded-3xl w-[70%] flex flex-col">
                  <label
                    htmlFor="imageFile"
                    className="text-black text-xl flex gap-2 items-center my-2"
                  >
                    <FaImage /> Add background image :{" "}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="outline-none px-2 w-full"
                    onChange={(event) =>
                      addImage(event.target as HTMLInputElement)
                    }
                  />
                </div>
              </div>
            ) : (
              ""
            )}
            <div
              className={`flex justify-center items-center ${
                page === 1 ? "hidden" : "block"
              }`}
            >
              <Button
                color="primary"
                variant="contained"
                type="submit"
                sx={{ width: "50%", margin: "auto" }}
                onClick={handleRegister}
              >
                {load ? "loading..." : page === 3 ? "Lets Go" : "next"}
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
}
