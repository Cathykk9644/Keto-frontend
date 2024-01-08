import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, Link } from "react-router-dom";
import Avatar, { genConfig } from "react-nice-avatar";
import signupbg from "../Assets/signupbg.png";
import logo from "../Assets/logo.png";
import domtoimage from "dom-to-image";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import { BACKEND_URL } from "../constants";

import { PiArrowsCounterClockwiseBold, PiTrashBold } from "react-icons/pi";

import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import { storage } from "../firebase";
import { v4 as uuidv4 } from "uuid";

const Signup = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [blobConfig, setBlobConfig] = useState();
  const [showFirstStep, setShowFirstStep] = useState(true);
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setBlobConfig(genConfig());
  }, []);

  const STORAGE_KEY = "profile/";

  // Refresh random avatar
  const handleRefreshAvatar = () => {
    setBlobConfig(genConfig());
  };

  // Send user profile image to the DB
  const handleCreateAccount = async () => {
    // check if user has uploaded own profile picture
    setIsCreating(true);
    if (profilePictureFile) {
      const storageRefInstance = ref(
        storage,
        STORAGE_KEY + profilePictureFile.name
      );
      uploadBytes(storageRefInstance, profilePictureFile).then((snapshot) => {
        getDownloadURL(storageRefInstance, profilePictureFile.name).then(
          (url) => {
            const sendSignupInformation = async () => {
              try {
                const newUser = {
                  firstName,
                  lastName,
                  email,
                  password,
                  profile_picture: url,
                };
                const response = await axios.post(
                  `${BACKEND_URL}/auth/signup`,
                  newUser,
                  { credentials: "include" }
                );
                console.log(response.data);
                const parseRes = response.jwtToken;

                if (parseRes) {
                  localStorage.setItem("token", parseRes);
                  toast.success("Registered Successfully");
                  navigate("/login");
                } else {
                  toast.error(parseRes);
                }
              } catch (error) {
                const profilePictureRef = ref(storage, url);
                deleteObject(profilePictureRef);
                toast.error(`${error.response.data.msg}`);
              } finally {
                setIsCreating(false);
              }
            };
            sendSignupInformation();
          }
        );
      });
    } else {
      const filename = uuidv4();
      const scale = 2;
      const node = document.getElementById("avatar");
      if (node) {
        const blob = await domtoimage.toBlob(node, {
          height: node.offsetHeight * scale,
          style: {
            transform: `scale(${scale}) translate(${
              node.offsetWidth / 2 / scale
            }px, ${node.offsetHeight / 2.5 / scale}px)`,
            "border-radius": 0,
          },
          width: node.offsetWidth * scale,
        });

        const storageRefInstance = ref(storage, STORAGE_KEY + filename);
        uploadBytes(storageRefInstance, blob).then((snapshot) => {
          getDownloadURL(storageRefInstance, filename).then((url) => {
            const sendSignupInformation = async () => {
              try {
                const newUser = {
                  firstName,
                  lastName,
                  email,
                  password,
                  profile_picture: url,
                };
                const response = await axios.post(
                  `${BACKEND_URL}/auth/signup`,
                  newUser,
                  { credentials: "include" }
                );
                console.log(response.data);
                const parseRes = response.jwtToken;

                if (parseRes) {
                  localStorage.setItem("token", parseRes);
                  toast.success("Registered Successfully");
                  navigate("/login");
                } else {
                  toast.error(parseRes);
                }
              } catch (error) {
                const profilePictureRef = ref(storage, url);
                deleteObject(profilePictureRef);
                toast.error(`${error.response.data.msg}`);
              } finally {
                setIsCreating(false);
              }
            };
            sendSignupInformation();
          });
        });
      }
    }
  };
  return (
    <div className="flex min-h-screen">
      {/* Left Side with Background Image */}
      <div
        className=" w-1/2 bg-cover text-white py-12 px-12 object-fill "
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
      {/* two steps signup process */}
      <AnimatePresence mode="wait">
        {showFirstStep ? (
          // * Step 1: Render out form to collect user information
          <motion.div
            key="0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0 }}
            className=" w-1/2 bg-bgColor2 py-20 px-20"
          >
            <h1 className="text-3xl font-bold mb-2 text-gray-500 items-center">
              Create Account
            </h1>
            <Formik
              initialValues={{
                firstname: "",
                lastname: "",
                email: "",
                password: "",
                confirmpassword: "",
              }}
              validate={(values) => {
                const errors = {};
                if (!values.firstname) {
                  errors.firstname = "Required";
                }
                if (!values.lastname) {
                  errors.lastname = "Required";
                }
                if (!values.email) {
                  errors.email = "Required";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Invalid email address";
                }
                if (!values.password) {
                  errors.password = "Required";
                }
                if (!values.confirmpassword) {
                  errors.confirmpassword = "Required";
                }
                if (values.confirmpassword !== values.password) {
                  errors.confirmpassword = "Passwords mismatch";
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  setFirstName(values.firstname);
                  setLastName(values.lastname);
                  setEmail(values.email);
                  setPassword(values.password);
                  setSubmitting(false);
                  setShowFirstStep(false);
                }, 400);
              }}
            >
              {({ isSubmitting }) => (
                <Form
                  className="flex flex-col w-full items-center mt-6"
                  noValidate
                >
                  <div className="flex flex-col items-center w-full">
                    <div className="w-full max-w-xs md:max-w-lg mb-4">
                      <label className="block text-gray-400 text-xs font-semibold">
                        First Name
                      </label>
                      <Field
                        type="text"
                        name="firstname"
                        placeholder="Mark"
                        className="h-10 block w-full mt-2 rounded-md border-0 p-4 text-gray-500 text-xs shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-0 focus:ring-1 focus:ring-inset focus:ring-teal-600"
                      />
                      <ErrorMessage
                        className="block text-xs text-red-800 mt-1"
                        name="firstname"
                        component="div"
                      />
                    </div>

                    <div className="w-full max-w-xs md:max-w-lg mb-4">
                      <label className="block text-gray-400 text-xs font-semibold">
                        Last Name
                      </label>
                      <Field
                        type="text"
                        name="lastname"
                        placeholder="Zuckerberg"
                        className="h-10 block w-full mt-2 rounded-md border-0 p-4 text-gray-500 text-xs shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-0 focus:ring-1 focus:ring-inset focus:ring-teal-600"
                      />
                      <ErrorMessage
                        className="block text-xs text-red-800  mt-1"
                        name="lastname"
                        component="div"
                      />
                    </div>

                    <div className="w-full max-w-xs md:max-w-lg mb-4">
                      <label className="block text-gray-400 text-xs font-semibold">
                        Email
                      </label>
                      <Field
                        type="email"
                        name="email"
                        placeholder="MarkZuckerberg@meta.com"
                        className="h-10 block w-full mt-2 rounded-md border-0 p-4 text-gray-500 text-xs shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-0 focus:ring-1 focus:ring-inset focus:ring-teal-600"
                      />
                      <ErrorMessage
                        className="block text-xs text-red-800 mt-1"
                        name="email"
                        component="div"
                      />
                    </div>

                    <div className="w-full max-w-xs md:max-w-lg mb-4">
                      <label className="block text-gray-400 text-xs font-semibold">
                        Password
                      </label>
                      <Field
                        type="password"
                        name="password"
                        placeholder="password"
                        className="h-10 block w-full mt-2 rounded-md border-0 p-4 text-gray-500 text-xs shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-0 focus:ring-1 focus:ring-inset focus:ring-teal-600"
                      />
                      <ErrorMessage
                        className="block text-xs text-red-800  mt-1"
                        name="password"
                        component="div"
                      />
                    </div>

                    <div className="w-full max-w-xs md:max-w-lg mb-3">
                      <label className="block text-gray-400 text-xs font-semibold">
                        Confirm Password
                      </label>
                      <Field
                        type="password"
                        name="confirmpassword"
                        placeholder="confirmpassword"
                        className="h-10 block w-full mt-2 rounded-md border-0 p-4 text-gray-500 text-xs shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-0 focus:ring-1 focus:ring-inset focus:ring-teal-600"
                      />
                      <ErrorMessage
                        className="block text-xs  text-red-800 mt-1"
                        name="confirmpassword"
                        component="div"
                      />
                    </div>

                    <button
                      className="h-10 px-4 py-2 bg-bgColor3 text-white w-full rounded-md hover:bg-emerald-600 max-w-xs md:max-w-lg mt-4 text-sm focus:outline-none"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Continue
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </motion.div>
        ) : (
          // * Step 2: Rendering out setting profile picture UI
          <motion.div
            key="1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center w-1/2 bg-bgColor2"
          >
            <h2 className="text-2xl font-semibold text-gray-500 mb-4">
              Avatar Time
            </h2>
            <p className="text-xs text-center w-3/4 text-gray-400">
              You can choose from any of our existing avatars, or feel free to
              upload your very own amazing picture!
            </p>
            <div className="relative mt-4 mb-4">
              {!profilePictureFile ? (
                <>
                  <Avatar
                    className="w-60 h-60 rounded-full"
                    {...blobConfig}
                    id="avatar"
                  />
                  <button
                    className="absolute bottom-[-0.1rem] right-[1.5rem] h-10 w-10 p-2 rounded-full text-gray-500 bg-white hover:bg-bgColor3 focus:outline-none"
                    onClick={handleRefreshAvatar}
                  >
                    <PiArrowsCounterClockwiseBold className="text-2xl" />
                  </button>
                </>
              ) : (
                <>
                  <img
                    src={URL.createObjectURL(profilePictureFile)}
                    alt="profile"
                    className="w-56 h-56 object-cover rounded-full"
                  />
                  <button
                    className="absolute bottom-[-0.1rem] right-[1.5rem] h-9 w-9 p-2 rounded-full text-gray-500 bg-white hover:bg-bgColor3 focus:outline-none"
                    onClick={() => setProfilePictureFile(null)}
                  >
                    <PiTrashBold className="text-lg" />
                  </button>
                </>
              )}
            </div>
            <div className="flex flex-col items-center justify-center gap-2 mt-6 w-full">
              <label
                htmlFor="image-input"
                className="btn cursor-pointer  px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-bgColor3 text-sm focus:outline-none"
              >
                Upload
              </label>
              <input
                id="image-input"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => setProfilePictureFile(e.target.files[0])}
              />
              <button
                className="h-10 w-60 px-4 py-2 bg-bgColor3 text-white rounded-md hover:bg-emerald-600 text-sm focus:outline-none"
                onClick={handleCreateAccount}
                disabled={isCreating}
              >
                Create Account
              </button>
              <button
                className="h-8 w-60 px-2 py-2 bg-gray-400 text-white rounded-md hover:bg-bgColor3 text-sm focus:outline-none"
                onClick={() => setShowFirstStep(true)}
              >
                Back
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default Signup;
