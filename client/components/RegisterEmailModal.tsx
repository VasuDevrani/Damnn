import { Button } from "@mui/material";
import React, { FormEvent, useState } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { BiArrowBack } from "react-icons/bi";
import { FaCamera } from "react-icons/fa";

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

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [disable, setDisable] = useState(false);
  const [page, setPage] = useState(1);

  const handleSubmit = (event: FormEvent<Element>) => {
    event.preventDefault();
  };

  return (
    <div>
      <Modal
        open={modal2}
        onClose={() => setModal2(!modal2)}
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
                <BiArrowBack />
              </div>
              <div className="text-siteLightBlue text-3xl">
                <FaCamera />
              </div>
              <p className="text-3xl font-bold">Sign Up to Damnn</p>
              <div className="flex flex-row p-2 px-3 items-center gap-10 cursor-pointer hover:bg-blue-50 border border-black rounded-3xl">
                Register with Google
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
                  className="outline-none px-2 w-full"
                />
              </div>
              <div className="border-2 border-gray-500 p-2 rounded-3xl w-[70%]">
                <input
                  type="text"
                  placeholder="Phone Number"
                  name="phone"
                  className="outline-none px-2 w-full"
                />
              </div>
              <div className="border-2 border-gray-500 p-2 rounded-3xl w-[70%]">
                <input
                  type="text"
                  placeholder="Your address"
                  name="address"
                  className="outline-none px-2 w-full"
                />
              </div>
              <div className="border-2 border-gray-500 p-2 rounded-3xl w-[70%]">
                <input type="date" name="dob" className="outline-none px-2 w-full"/>
              </div>
            </div>
          ) : page === 3 ? (
            <div className="flex flex-col my-3">
                <p className="text-2xl font-bold mb-5">Add a bio: </p>
                <div className="border border-black p-2">
                <textarea name="bio" className="w-full outline-none" cols={30} rows={10}></textarea>
                </div>
            </div>
          ) : (
            ""
          )}
          <Button
            color="primary"
            variant="contained"
            type="submit"
            sx={{ width: "50%", margin: "auto" }}
            onClick={() => setPage(page < 3 ? page + 1 : 1)}
            disabled={disable}
          >
            {page === 3 ? 'Lets Go' : 'next'}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
