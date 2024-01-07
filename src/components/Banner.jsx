import React from "react";
import { motion } from "framer-motion";
import Bgfood from "../Assets/Bgfood.png";
import delivery from "../Assets/delivery.jpeg";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex  px-10 ">
      {" "}
      {/* mt-24 is to give space below the fixed header */}
      <div className="flex-1 p-12">
        <h1 className="text-4xl font-bold mb-12  text-slate-600">
          Simply Keto, Simply Life
        </h1>

        <p className="mb-14 mt-14 text-gray-400 text-sm">
          Transform your lifestyle with our Keto Food Delivery App! Enjoy the
          convenience of delicious and healthy keto meals delivered to your
          doorstep. Experience the benefits of keto while savoring the flavors
          you love the most!
        </p>

        <div className="flex items-center">
          <button
            onClick={() => navigate("/signup")}
            className=" text-white py-3 px-4 rounded-xl text-md hover:bg-emerald-700 transition duration-300 hover:scale-90 bg-gradient-to-r from-emerald-300 to bg-emerald-600"
          >
            Order Now
          </button>
          <motion.div
            whileTap={{ x: 420 }}
            transition={{ duration: 0.8 }}
            className="w-14 h-14 bg-white rounded-full overflow-hidden drop-shadow-xl ml-8"
          >
            <img
              src={delivery}
              className="w-full h-full object-contain"
              alt="delivery"
            />
          </motion.div>
        </div>
      </div>
      {/* Right side (Food Image) */}
      <div className="flex-1">
        <img
          src={Bgfood}
          alt="Delicious Food"
          className="w-4/5 h-full object-cover border-4 rounded-full border-style: border-dotted p-1 hover:scale-110 transition duration-300"
        />
      </div>
    </div>
  );
};

export default Banner;
