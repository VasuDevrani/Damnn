import React, { FormEvent, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { FaCamera } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";
import { Button } from "@mui/material";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../context/hooks";
import { firLogin, login, reset } from "../slices/UserSlice";

// firebase
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../firebaseConfig";

export default function LoginModal({
  modal1,
  setModal1,
}: {
  modal1: boolean;
  setModal1: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
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

  const { isLoading, isSuccess, isError, message } = useAppSelector(
    (state) => state.user
  );
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // firebase login
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const handleSubmit = (event: FormEvent<Element>) => {
    event.preventDefault();
    console.log(formData);

    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((res) => {
        dispatch(login(formData));
      })
      .catch((err) => {
        window.alert("Please enter correct credentials");
        console.log(err);
      });
  };

  const handleGoogleAuth = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const email = result.user.email ? result.user.email : "";
        dispatch(firLogin({ email: email, isFirAuth: true }));
      })
      .catch((error) => {
        window.alert(error.message);
      });
  };

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
    <div>
      <Modal
        open={modal1}
        onClose={() => setModal1(!modal1)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex flex-col items-center justify-center gap-5 relative">
            <div
              className="absolute top-0 left-0 text-2xl cursor-pointer"
              onClick={() => setModal1(!modal1)}
            >
              <BiArrowBack />
            </div>
            <div className="text-siteLightBlue text-3xl">
              <FaCamera />
            </div>
            <p className="text-3xl font-bold">Sign In to Damnn</p>
            <div
              className="flex flex-row p-2 px-3 items-center gap-10 cursor-pointer hover:bg-blue-50 border border-black rounded-3xl"
              onClick={handleGoogleAuth}
            >
              Sign in with Google
              <img
                src="https://seeklogo.com/images/G/google-logo-28FA7991AF-seeklogo.com.png"
                alt="Google"
                className="h-3"
              />
            </div>
            <p>or,</p>
            <div className="flex flex-col gap-2">
              <ValidatorForm
                onSubmit={(event: FormEvent<Element>) => handleSubmit(event)}
              >
                <TextValidator
                  label="Email"
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      email: (event.target as HTMLInputElement).value,
                    })
                  }
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
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      password: (event.target as HTMLInputElement).value,
                    })
                  }
                  name="password"
                  value={formData.password}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
                <br />
                <Button color="primary" variant="contained" type="submit">
                  Login
                </Button>
              </ValidatorForm>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
