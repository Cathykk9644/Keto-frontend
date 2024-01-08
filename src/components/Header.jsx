import React, { useState, useEffect, useRef } from "react";
import logo from "../Assets/logo.png";
import { AiOutlineSearch } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();

  const dropdownRef = useRef(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  // Function to toggle the dropdown menu
  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  // This effect will add an event listener to the document to hide the dropdown when clicking outside
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        dropdown &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setDropdown(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [dropdown]); // Dependency array with dropdown ensures the effect is run when the dropdown's visibility changes

  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();

  // Calculate the total number of items in the cart
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Define the admin email here
  const adminEmail = "florahui@test.com";

  // Check if the user is an admin
  useEffect(() => {
    setIsAdmin(user?.email === adminEmail);
  }, [user]);

  const logout = () => {
    // Clear user from local storage or any other storage used
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Update the global state to set the user to null
    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
    toast.success("Logged out Successfully");
    navigate("/");
  };

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  return (
    <div className="w-screen z-50 p-6 px-16">
      {/* for mobile /}
<div className="flex md:hidden w-full h-full"></div>
{/ for desktop & tablet */}
      <div className="hidden md:flex w-full h-full justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <img src={logo} alt="logo" className="w-32 object-cover " />
          </div>
          <div className="flex items-center">
            <ul className="flex items-center gap-8">
              <div className="flex items-center gap-1 text-textColor1 hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer font-semibold">
                <li className="text-sm">Lifestyle</li>
                <RiArrowDropDownLine className="text-2xl " />
              </div>

              <div className="flex items-center gap-1 text-textColor1 hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer font-semibold">
                <li
                  className="text-sm"
                  onClick={() => {
                    navigate("/addmeal");
                  }}
                >
                  Meals
                </li>
                <RiArrowDropDownLine className="text-2xl " />
              </div>

              <div
                className="flex items-center gap-8 relative "
                onMouseLeave={() => setDropdown(false)}
              >
                {user ? (
                  // User is logged in
                  <>
                    <button
                      onClick={logout}
                      className="text-sm text-textColor1 hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer border-2 p-2 font-semibold rounded-lg border-slate-400 hover:scale-95"
                    >
                      {" "}
                      Logout
                    </button>
                    <img
                      src={user.profile_picture}
                      alt="Profile"
                      className="w-11 h-11 rounded-full object-cover cursor-pointer border-gray-300 border-2 hover:scale-95
                      
                      "
                      ref={dropdownRef} // Add this line to set the ref for the dropdown
                      onClick={toggleDropdown}
                    />
                    {/* dropdown bar */}
                    {dropdown && (
                      <div className="absolute right-0 mt-24 py-1 w-24 bg-white rounded-lg shadow-xl z-20">
                        <span
                          className="block px-4 py-1 text-xs capitalize text-gray-600 hover:bg-slate-50  cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate("/profile");
                            setDropdown(false);
                          }}
                        >
                          Profile
                        </span>
                        <span
                          className="block px-4 py-1 text-xs capitalize text-gray-600 hover:bg-slate-50  cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate("/orders");
                            setDropdown(false);
                          }}
                        >
                          Orders
                        </span>
                        {isAdmin && (
                          <span
                            className="block px-4 py-1 text-xs capitalize text-gray-600 hover:bg-slate-50  cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate("/addmeal");
                              setDropdown(false);
                            }}
                          >
                            Add Meal
                          </span>
                        )}
                      </div>
                    )}
                    <span className="text-xs text-gray-400 -ml-6  font-semibold ">
                      {`Hi ${user.firstName}!`}
                    </span>
                  </>
                ) : (
                  // User is not logged in
                  <>
                    <button
                      onClick={() => navigate("/login")}
                      className="text-sm text-textColor1 hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer font-semibold"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => navigate("/signup")}
                      className="text-sm text-textColor1 hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer border-2 p-2 font-semibold rounded-lg border-slate-400 hover:scale-90"
                    >
                      Signup
                    </button>
                  </>
                )}
              </div>
            </ul>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <form className="relative">
            <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            <input
              className="border-2 border-gray-200 bg-white h-12 w-64 px-5 pl-10 pr-10 rounded-lg text-xs focus:outline-none hover:border-gray-400"
              type="search"
              name="search"
              placeholder="Search"
              required
            />
          </form>
          <motion.div
            whileHover={{ scale: 0.9 }}
            onClick={showCart}
            className="relative ml-8"
          >
            <FiShoppingCart className="w-12 h-12 text-white bg-green-400 rounded-full py-4" />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center ">
              <p className="text-xs text-slate-500 ">{totalItems}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Header;
