import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { toast } from "react-toastify";

const MealRow = ({ meal, flag }) => {
  const [{}, dispatch] = useStateValue();

  const addToCart = () => {
    dispatch({
      type: actionType.ADD_TO_CART,
      payload: meal,
    });
    toast.success(`${meal.name} added to cart!`, {
      autoClose: 1800,
    });
  };
  if (!meal) {
    return <div>No meal data available</div>;
  }
  const imageUrl = meal.meal_picture;
  const name = meal.name;
  const price = meal.price;

  return (
    <div
      className={`w-full my-4 scroll-smooth ${
        flag
          ? "flex overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden flex-wrap justify-center"
      }`}
    >
      {/* Meal card container */}
      <div className="flex-none w-64  h-auto backdrop-blur-lg border-2 rounded-lg border-slate-400 border-dotted px-7 py-4 mr-2 relative ">
        <motion.div className="w-full flex items-center justify-between drop-shadow-xl relative">
          <motion.img
            whileHover={{ scale: 1.05 }}
            className="w-full h-40 object-cover rounded-lg "
            src={imageUrl}
            alt={name}
          />
        </motion.div>
        <div className="w-full flex flex-col gap-1 items-start justify-start">
          <p className="text-gray-400 font-semibold text-base md:text-sm mt-2">
            {name}
          </p>
          <div className="flex items-center justify-between w-full">
            <p className="text-sm text-slate-500 font-semibold">
              <span className="text-xs">$</span>
              {price}
            </p>
            <motion.div
              whileTap={{ scale: 0.8 }}
              className="w-8 h-8 rounded-full bg-emerald-400 flex items-center justify-center text-white text-xs cursor-pointer hover:shadow-md hover:bg-emerald-500 -mr-16"
            >
              <FaRegHeart />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.8 }}
              className="w-8 h-8 rounded-full bg-emerald-400 flex items-center justify-center text-white text-xs cursor-pointer hover:shadow-md hover:bg-emerald-500"
              onClick={addToCart}
            >
              <FiShoppingCart />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealRow;
