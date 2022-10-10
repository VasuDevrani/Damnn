import React, { useState } from "react";
import { FaCamera } from "react-icons/fa";
import LoginModal from "../components/LoginModal";
import RegisterEmailModal from "../components/RegisterEmailModal";

export default function Auth() {
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);

  return (
    <div className="flex flex-col md:flex-row items-center">
      <div className="flex-[0.5] flex items-center justify-center min-h-[100vh]">
        <img
          src="https://i.pinimg.com/564x/a3/f8/66/a3f8662af67f165dc4ab756b4fd538d8.jpg"
          alt="poster"
          className="object-contain h-[100vh]"
        />
      </div>
      <div className="flex flex-[0.5] h-[100vh] flex-col items-start justify-around">
        <div className="text-siteLightBlue text-3xl">
          <FaCamera />
        </div>
        <div>
          <p className="text-6xl font-extrabold my-5 mb-8">How're You Doing?</p>
          <p className="text-2xl font-semibold">🔥Join Damnn Today</p>
        </div>
        <div className="flex flex-col items-start gap-4">
          <div
            className="p-2 border cursor-pointer rounded-3xl bg-siteLightBlue text-white px-4"
            onClick={() => setModal2(!modal2)}
          >
            Sign Up Now !!
          </div>
          <div className="text-[15px]">
            <p className="text-left">
              By signing up, you agree to the{" "}
              <span className="text-siteLightBlue hover:underline cursor-pointer">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-siteLightBlue hover:underline cursor-pointer">
                Privacy Policy
              </span>
              , including{" "}
              <span className="text-siteLightBlue hover:underline cursor-pointer">
                Cookie Use
              </span>
              .
            </p>
          </div>

          <div className="flex items-start flex-col my-5 gap-2">
            <p className="text-xl font-semibold">Already have an Account?</p>
            <div
              className="p-2 border-2 cursor-pointer rounded-3xl px-8"
              onClick={() => setModal1(!modal1)}
            >
              Sign In
            </div>
          </div>
        </div>
      </div>
      <LoginModal modal1={modal1} setModal1={setModal1} />
      <RegisterEmailModal modal2={modal2} setModal2={setModal2} />
    </div>
  );
}
