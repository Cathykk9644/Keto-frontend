import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import loginbg from "../Assets/loginbg.png";
import logo from "../Assets/logo.png";
import Axios from "axios";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../constants";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const Login = () => {
  const navigate = useNavigate();

  const [{ user }, dispatch] = useStateValue();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post(`${BACKEND_URL}/auth/login`, inputs);

      if (response.data.jwtToken) {
        localStorage.setItem("token", response.data.jwtToken);

        // Assuming response.data.user is your user object
        localStorage.setItem("user", JSON.stringify(response.data.user));
        console.log(response.data.user);

        toast.success("Logged in Successfully");
        navigate("/");

        // Update the global state with the user info
        dispatch({
          type: actionType.SET_USER,
          user: response.data.user,
        });
      } else {
        toast.error("Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      toast.error("Login failed. Please try again.");
    }
  };
  return (
    <div className="flex min-h-screen">
      <div className=" flex flex-col gap-8 w-1/2 bg-bgColor2 py-32 px-20">
        <h1 className="text-4xl font-bold text-gray-500 items-center">Login</h1>
        <form className="flex flex-col space-y-4" onSubmit={onSubmitForm}>
          <div className="w-full">
            <label className="block text-gray-500 text-xs">Your Email</label>
            <input
              className="h-10 block w-full mt-2 rounded-md border-0 p-4 text-gray-500 text-xs shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-0 focus:ring-1 focus:ring-inset focus:ring-teal-600"
              name="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => onChange(e)}
              required
            />
          </div>

          <div className="w-full mb-4">
            <label className="block text-gray-500 text-xs">Your Password</label>
            <input
              className="h-10 block w-full mt-2 rounded-md border-0 p-4 text-gray-500 text-xs shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-0 focus:ring-1 focus:ring-inset focus:ring-teal-600"
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => onChange(e)}
              required
            />
          </div>

          <button
            type="submit"
            className="h-10 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-bgColor3 text-sm focus:outline-none"
          >
            Let's go!
          </button>
        </form>
      </div>

      {/* Right Side with Background Image */}
      <div
        className="w-1/2 bg-cover text-white py-20 px-12 object-fill"
        style={{ backgroundImage: `url(${loginbg})` }}
      >
        <Link to="/">
          <img src={logo} alt="logo" className="w-36 object-cover " />
        </Link>

        <h1 className="text-5xl font-bold ml-6 mb-8 text-gray-500">
          Welcome Back!
        </h1>

        <p className="text-2xl font-semibold mb-4 text-gray-400 ml-6">
          Nothing is the same without you!
        </p>

        <p className="text-sm ml-6 mb-4 text-slate-400">
          New to us? Go ahead and{" "}
          <span
            className="underline text-sm btn p-0 btn-link btn-sm text-bgColor3"
            onClick={() => navigate("/signup")}
          >
            Sign up now!
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;

// toast msg aligned with the backend for consistency
