import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import signupbg from "../Assets/signupbg.png";
import logo from "../Assets/logo.png";
import Avatar, { genConfig } from "react-nice-avatar";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

import {
  PiArrowsCounterClockwiseBold,
  PiTrashBold,
  PiArrowLeftBold,
} from "react-icons/pi";

const SetProfile = () => {
  const navigate = useNavigate();

  // State to store the avatar configuration
  const [avatarConfig, setAvatarConfig] = useState(genConfig());

  // Function to generate a new random avatar configuration
  const randomizeAvatar = () => {
    setAvatarConfig(genConfig());
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side with Background Image */}
      <div
        className="w-1/2 bg-cover text-white py-12 px-12 object-fill "
        style={{ backgroundImage: `url(${signupbg})` }}
      >
        <Link to="/">
          <img src={logo} alt="logo" className="w-36 object-cover " />
        </Link>

        <h1 className="text-5xl font-bold mb-10 text-gray-500 ml-6">
          Hello Friend!
        </h1>

        <p className="text-2xl font-semibold mb-4 text-gray-400 ml-6">
          Let's start our keto journey from here!
        </p>

        <p className="text-sm  ml-6 mt-4 text-slate-400">
          Already have an account with us?{" "}
          <span
            className="underline text-sm btn p-0 btn-link btn-sm text-bgColor3"
            onClick={() => navigate("/login")}
          >
            Log in now!
          </span>
        </p>
      </div>

      {/* Right Side with Sign Up Form */}
      <div className=" w-1/2 bg-bgColor2 py-20 px-20">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-semibold mb-2 mt-4 text-gray-500 ">
            Avatar Time
          </h1>
          <p className="text-xs  text-gray-400 text-center w-3/4">
            You can select any of our fantastic avatars, or if you prefer, you
            can upload your very own amazing picture!
          </p>
          {/* Avatar Display */}

          <motion.div
            whileHover={{ scale: 0.95 }}
            className="mt-4 mb-4 relative"
          >
            <Avatar className="w-56 h-56 rounded-full " {...avatarConfig} />
            <button
              className="btn btn-link absolute bottom-[-0.2rem] right-[-0.5rem]" // Adjust margin as needed
              onClick={randomizeAvatar}
            >
              <PiArrowsCounterClockwiseBold className="h-10 w-10  p-2 rounded-full text-gray-500 bg-white" />
            </button>
          </motion.div>
          <button
            type="submit"
            className="h-10 px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-bgColor3 text-sm focus:outline-none "
          >
            Upload
          </button>
          <div className=" flex flex-col items-center justify-center gap-2 mt-6">
            {" "}
            <button
              type="submit"
              className="h-10 w-60 px-4 py-2 bg-bgColor3 text-white rounded-md hover:bg-emerald-600 text-sm focus:outline-none "
            >
              Create Account
            </button>
            <button
              type="submit"
              onClick={() => navigate("/createaccount")}
              className="h-8 w-60 px-2 py-2 bg-gray-400 text-white rounded-md hover:bg-bgColor3 text-sm focus:outline-none "
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetProfile;
