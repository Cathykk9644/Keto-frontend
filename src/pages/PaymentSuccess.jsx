import React from "react";
import { useNavigate } from "react-router-dom";
import pickup from "../Assets/pickup.gif";
import logo from "../Assets/logo.png";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  setTimeout(() => {
    navigate("/");
  }, 10000);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-bgColor1 gap-6">
      <div className="flex items-center justify-center w-full -mb-8">
        <img src={logo} alt="logo" className="w-32 object-cover" />
        <h1 className="text-5xl text-emerald-500 font-bold ">
          Payment Successful!
        </h1>
      </div>
      <p className="text-gray-500">
        <span className="text-3xl text-gray-700 font-bold">Liam</span> has
        picked up your food, it should be arrived in{" "}
        <span className="font-bold">20 to 30 mins!</span>
      </p>
      <img
        src={pickup}
        alt="Delivery Animation"
        className="w-80 h-auto rounded-full"
      />

      <p className="text-gray-500 text-sm">
        Thank you for choosing us, hope you have a pleasant experience with us!
      </p>
      <p className="text-gray-400 text-xs font-semibold ">
        Simply Keto @ 2023 HK
      </p>
    </div>
  );
};

export default PaymentSuccess;
