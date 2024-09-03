import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import logo from "../Assets/logo.png";
import addmealbg from "../Assets/addmealbg.png";
import { motion } from "framer-motion";
import { storage } from "../firebase";
import Loader from "../components/Loader";

import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import { BACKEND_URL } from "../constants";

import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdAttachMoney,
} from "react-icons/md";

import { useNavigate, Link } from "react-router-dom";

const AddNewMeal = () => {
  const navigate = useNavigate();

  const STORAGE_KEY = "meals/";

  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (event) => {
    if (event.target.files[0]) {
      setImageFile(event.target.files[0]);
      // Clear the value after setting the file
      event.target.value = null;
    }
  };

  const handleSave = async () => {
    if (!name || !price || !imageFile) {
      alert("Please fill in all fields and select an image.");
      return;
    }
  };

  const handleAddMeal = async () => {
    // Start the process of adding a new meal
    setIsCreating(true);

    // Check if an image file is provided
    if (imageFile) {
      const storageRefInstance = ref(storage, STORAGE_KEY + imageFile.name);

      try {
        const snapshot = await uploadBytes(storageRefInstance, imageFile);

        const downloadUrl = await getDownloadURL(storageRefInstance);
        console.log("Download URL:", downloadUrl);
        setImageUrl(downloadUrl);

        const newMeal = {
          name,
          price,
          meal_picture: downloadUrl,
        };

        const response = await axios.post(`${BACKEND_URL}/meals`, newMeal);
        console.log(response.data);
        toast.success("Meal added successfully");
        navigate("/");
      } catch (error) {
        console.log(error);
        // Improved error handling
        if (error.response && error.response.data && error.response.data.msg) {
          toast.error(`${error.response.data.msg}`);
        } else {
          toast.error("An error occurred while adding the meal.");
        }
      } finally {
        setIsCreating(false);
      }
    }
  };

  const deleteImage = () => {
    if (!imageUrl) {
      toast.error("No image to delete.");
      return;
    }
    setIsLoading(true);
    // Assuming imageUrl is the correct string path to the file in Firebase Storage
    const deleteRef = ref(storage, imageUrl);
    deleteObject(deleteRef)
      .then(() => {
        setImageFile(null);
        setImageUrl(null); // Clear the imageUrl state after deletion
        toast.success("Image deleted successfully.");
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error deleting image:", error);
        toast.error("Failed to delete image.");
        setIsLoading(false);
      });
  };

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center object-cover"
      style={{
        backgroundImage: `url(${addmealbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        width: "100vw",
      }}
    >
      {/* Logo Section */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
        <img src={logo} alt="logo" className="w-36 object-cover -mt-2" />
      </div>

      <div className="w-2/3 md:w-[50%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4 px-12">
        {/* Title Section */}
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdFastfood className="text-xl text-gray-600" />
          <input
            type="text"
            required
            placeholder="Give me a title..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-full text-sm bg-transparent outline-none
          border-none placeholder:text-gray-400 text-gray-400"
          />
        </div>

        {/* Image Upload Section */}
        <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-240 md:h-300 cursor-pointer rounded-lg">
          {isLoading ? (
            <Loader />
          ) : imageFile ? (
            <div className="relative h-full">
              <img
                src={URL.createObjectURL(imageFile)} // Create a URL for the local file
                alt="uploaded"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                className="absolute bottom-3 right-2 p-3 rounded-full bg-gray-400 text-xl cursor-pointer outline-none hover:bg-slate-500 
                hover:scale-95
                duration-500 transition-all ease-in-out"
                onClick={deleteImage}
              >
                <MdDelete className="text-white" />
              </button>
            </div>
          ) : (
            <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
              <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                <p className="text-gray-500 hover:text-gray-700">
                  Click here to upload a meal
                </p>
              </div>
              <input
                type="file"
                onChange={handleImageChange}
                name="uploadimage"
                accept="image/*"
                className="w-0 h-0"
              />
            </label>
          )}
        </div>

        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdAttachMoney className="text-gray-500 text-xl" />
            <input
              type="number"
              required
              placeholder="Meal Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full h-full text-sm
             bg-transparent outline-none border-none placeholder:text-gray-500 text-gray-500"
            />
          </div>
        </div>
        <div className="flex items-center  justify-center w-full ">
          <button
            type="button"
            onClick={handleAddMeal}
            disabled={isCreating}
            className=" w-full md:w-auto bg-transparent text-md text-white  border border-solid border-white px-6 py-1 rounded-lg hover:scale-95"
          >
            Add Meal
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewMeal;

// Duplicate with Addmeal component
