import React from "react";
import Loader from "../Assets/Loader.gif";

const Loading = () => {
  return (
    <div className="absolute min-h-screen max-h-full w-screen backdrop-blur-md flex flex-col justify-center items-center ">
      <div className="opacity-70">
        <img className="w-[450px] h-auto" src={Loader} alt="loading" />
      </div>
    </div>
  );
};

export default Loading;
