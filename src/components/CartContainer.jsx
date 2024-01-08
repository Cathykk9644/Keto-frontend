import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";

import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import EmptyCart from "../Assets/EmptyCart.avif";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { BACKEND_URL } from "../constants";

const CartContainer = () => {
  const navigate = useNavigate();
  const [{ cartShow, cartItems, user }, dispatch] = useStateValue();
  const [flag, setFlag] = useState(1);
  const [tot, setTot] = useState(0);

  const stripePromise = loadStripe(
    "pk_test_51OWBijK56MGI4ZMlzqLUxpfkmNF1cZo31g3lP7f7Se83vB76J4yG6ba3SbVTMcxw8ymr31JCz4qCfggvsFW0Gsgo00b8LYvSke"
  );

  const handleCheckout = async () => {
    try {
      // Create a checkout object to send to the backend
      const checkoutCart = cartItems.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.meal_picture,
      }));

      // Send the cart to your backend to create a checkout session
      const response = await axios.post(
        `${BACKEND_URL}/meals/create-checkout-session`,
        {
          items: checkoutCart,
        }
      );

      // Get the Checkout Session ID
      const sessionId = response.data.sessionId;

      // Redirect the customer to the Stripe Checkout page
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error("Checkout error", error);
    }
  };

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  useEffect(() => {
    let totalPrice = cartItems.reduce((accumulator, item) => {
      const itemPrice = parseFloat(item.price);
      const itemQuantity = parseInt(item.quantity, 10);
      const price = isNaN(itemPrice) ? 0 : itemPrice;
      const quantity = isNaN(itemQuantity) ? 0 : itemQuantity;
      return accumulator + price * quantity;
    }, 0);
    setTot(totalPrice.toFixed(2));
  }, [cartItems]);

  const clearCart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: [],
    });

    localStorage.setItem("cartItems", JSON.stringify([]));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="fixed top-0 right-0 w-full md:w-375 h-screen bg-gray-50 drop-shadow-md flex flex-col z-[101]"
    >
      <div className="w-full flex items-center justify-between p-4 cursor-pointer">
        <motion.div whileTap={{ scale: 0.8 }} onClick={showCart}>
          <MdOutlineKeyboardBackspace className="text-gray-500 text-3xl" />
        </motion.div>
        <p className="text-gray-500 text-lg font-semibold">Cart</p>

        <motion.p
          whileTap={{ scale: 0.8 }}
          className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md  cursor-pointer text-gray-500 text-base"
          onClick={clearCart}
        >
          Clear <RiRefreshFill />
        </motion.p>
      </div>

      {/* bottom section */}
      {cartItems && cartItems.length > 0 ? (
        <div className="w-full h-full bg-bgColor1 rounded-t-[2rem] flex flex-col">
          {/* cart Items section */}
          <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
            {/* cart Item */}
            {cartItems &&
              cartItems.length > 0 &&
              cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  setFlag={setFlag}
                  flag={flag}
                />
              ))}
          </div>

          {/* cart total section */}
          <div className="w-full flex-1 bg-gradient-to-br  from-green-400 to bg-emerald-700 rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
            <div className="w-full flex items-center justify-between">
              <p className="text-white text-md">Sub-total :</p>
              <p className="text-white text-md">${tot}</p>
            </div>
            {/* <div className="w-full flex items-center justify-between">
              <p className="text-white text-md">Delivery :</p>
              <p className="text-white text-md">$4.19</p>
            </div> */}

            <div className="w-full border-b border-white my-2"></div>

            <div className="w-full flex items-center justify-between">
              <p className="text-white text-lg font-semibold">Total :</p>
              <p className="text-white text-lg font-semibold">
                ${(+tot).toFixed(2)}
              </p>
            </div>

            {user ? (
              <motion.button
                whileTap={{ scale: 0.9 }}
                type="button"
                onClick={handleCheckout}
                className="w-full p-2  rounded-2xl bg-transparent border-2 text-gray-50 text-lg my-2 hover:shadow-lg hover:scale-95"
              >
                Check Out
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                onClick={() => navigate("/login")}
                className="w-full p-2 rounded-2xl bg-transparent border-2 text-white text-lg my-2 hover:shadow-lg hover:scale-95"
              >
                Login to check out
              </motion.button>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6 opacity-80">
          <img src={EmptyCart} className="w-300 rounded-full" alt="" />
          <p className="text-xl text-gray-500 font-semibold ">
            Add some items to your cart
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default CartContainer;
