import React from "react";
import logo from "../Assets/logo.png";
import { AiOutlineSearch } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { motion } from "framer-motion";
import { useNavigate, useLocation, Link } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="fixed w-screen z-50 p-6 px-16">
      {/* for mobile */}
      <div className="flex md:hidden w-full h-full"></div>
      {/* for desktop & tablet */}
      <div className="hidden md:flex w-full h-full justify-between items-center">
        <div className="flex items-center gap-8">
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
                <li className="text-sm">Meals</li>
                <RiArrowDropDownLine className="text-2xl " />
              </div>

              <li
                onClick={() =>
                  navigate("/login", {
                    state: { from: location.pathname },
                  })
                }
                className="text-sm text-textColor1 hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer font-semibold"
              >
                Login
              </li>
              <button
                onClick={() =>
                  navigate("/createaccount", {
                    state: { from: location.pathname },
                  })
                }
                className="text-sm text-textColor1 hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer border-2 p-2 font-semibold rounded-lg border-slate-400 hover:text-xs "
              >
                Signup
              </button>
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
          <motion.div whileHover={{ scale: 0.9 }} className="relative ml-8">
            <FiShoppingCart className="w-12 h-12 text-white bg-green-400 rounded-full py-4" />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center ">
              <p className="text-xs text-textColor1 ">16</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Header;
