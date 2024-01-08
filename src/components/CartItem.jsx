import React, { useEffect, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const CartItem = ({ item, setFlag }) => {
  const [{ cartItems }, dispatch] = useStateValue();
  const [quantity, setQuantity] = useState(1);

  const updateCartState = (newCartItems) => {
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));

    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: newCartItems,
    });

    setFlag((f) => f + 1);
  };

  const updateQuantity = (action, id) => {
    let newCartItems = cartItems
      .map((cartItem) => {
        if (cartItem.id === id) {
          const newQuantity = cartItem.quantity + (action === "add" ? 1 : -1);
          setQuantity(newQuantity);
          return {
            ...cartItem,
            quantity: newQuantity,
          };
        }
        return cartItem;
      })
      .filter((cartItem) => cartItem.quantity > 0);

    updateCartState(newCartItems);
  };

  useEffect(() => {
    const itemQuantity = Number(item.quantity);
    setQuantity(!isNaN(itemQuantity) ? itemQuantity : 1);
  }, [item.quantity]);

  return (
    <div className="w-full py-2 px-2 rounded-lg bg-gradient-to-br from-emerald-600 to bg-green-500 flex items-center gap-2">
      <img
        src={item?.meal_picture}
        className="w-16 h-16 max-w-[60px] rounded-full object-cover"
        alt={item?.name}
      />
      {/* name section */}
      <div className="flex flex-col gap-2">
        <p className="text-sm text-white">{item?.name}</p>

        {/* Check if item?.price is a valid number and qty is defined before multiplying */}
        <p className="text-sm block text-white font-semibold">
          {item?.price && !isNaN(quantity)
            ? (parseFloat(item?.price) * quantity).toFixed(2)
            : "0.00"}
        </p>
      </div>

      {/* button section */}
      <div className="group flex items-center gap-2 ml-auto cursor-pointer">
        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQuantity("remove", item?.id)}
        >
          <BiMinus className="text-gray-50" />
        </motion.div>

        <p className="w-5 h-5 rounded-2xl border-2 text-white text-xs flex items-center justify-center">
          {quantity}
        </p>

        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQuantity("add", item?.id)}
        >
          <BiPlus className="text-gray-50" />
        </motion.div>
      </div>
    </div>
  );
};

export default CartItem;
