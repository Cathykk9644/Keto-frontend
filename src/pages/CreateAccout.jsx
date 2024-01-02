import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import signupbg from "../Assets/signupbg.png";
import logo from "../Assets/logo.png";

const CreateAccount = () => {
  const navigate = useNavigate();
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
        <h1 className="text-3xl font-bold mb-6 text-gray-500 items-center">
          Create Account
        </h1>
        <form className="flex flex-col space-y-4">
          <div className="w-full ">
            <label className="block text-gray-500 text-xs">First Name</label>
            <input
              className="h-10 block w-full mt-2 rounded-md border-0 p-4 text-gray-500 text-xs shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-0 focus:ring-1 focus:ring-inset focus:ring-teal-600"
              type="text"
              placeholder="Mark"
              required
            />
          </div>

          <div className="w-full ">
            <label className="block text-gray-500 text-xs">Last Name</label>
            <input
              className="h-10 block w-full mt-2 rounded-md border-0 p-4 text-gray-500 text-xs shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-0 focus:ring-1 focus:ring-inset focus:ring-teal-600"
              type="text"
              placeholder="Zuckerberg"
              required
            />
          </div>

          <div className="w-full mb-4">
            <label className="block text-gray-500 text-xs">Your Email</label>
            <input
              className="h-10 block w-full mt-2 rounded-md border-0 p-4 text-gray-500 text-xs shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-0 focus:ring-1 focus:ring-inset focus:ring-teal-600"
              type="email"
              placeholder="Email"
              required
            />
          </div>

          <div className="w-full mb-4">
            <label className="block text-gray-500 text-xs">Your Password</label>
            <input
              className="h-10 block w-full mt-2 rounded-md border-0 p-4 text-gray-500 text-xs shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-0 focus:ring-1 focus:ring-inset focus:ring-teal-600"
              type="password"
              placeholder="Password"
              required
            />
          </div>

          <div className="w-full mb-8">
            <label className="block text-gray-500 text-xs">
              Confirm Password
            </label>
            <input
              className="h-10 block w-full mt-2 rounded-md border-0 p-4 text-gray-500 text-xs shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-0 focus:ring-1 focus:ring-inset focus:ring-teal-600"
              type="password"
              placeholder="Password Again"
              required
            />
          </div>

          <button
            type="submit"
            onClick={() => navigate("/setprofile")}
            className="h-10 px-4 py-2 bg-bgColor3 text-white rounded-md hover:bg-emerald-600 text-sm focus:outline-none "
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
