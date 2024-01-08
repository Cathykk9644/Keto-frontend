import React from "react";
import { useNavigate } from "react-router-dom";
import pickup from "../Assets/pickup.gif";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  setTimeout(() => {
    navigate("/");
  }, 8000);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-bgColor1">
      <h1 className="text-5xl text-green-600 font-bold mb-10">
        Payment Successful!
      </h1>
      <img
        src={pickup}
        alt="Delivery Animation"
        className="w-80 h-auto rounded-full "
      />
      <p className="text-gray-500 mt-8">
        <span className="text-2xl text-gray-600 font-bold">Liam</span> has
        picked up your food, it should be arrived in{" "}
        <span className="font-bold">20 to 30 mins!</span>
      </p>
    </div>
  );
};

export default PaymentSuccess;
