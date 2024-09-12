import React, { useState } from "react";
import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { BACKEND_URL } from "../constants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EditUserModal = ({ user, setUserProfile, onClose }) => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [profilePicture, setProfilePicture] = useState(user.profile_picture);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const uploadImage = async () => {
    if (!profilePicture) return null;

    const storageRef = ref(storage, `profile/${profilePicture.name}`);
    const uploadTask = uploadBytes(storageRef, profilePicture);
    const snapshot = await uploadTask;
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      const imageUrl = await uploadImage();
      const updatedUser = {
        firstName,
        lastName,
        profile_picture: imageUrl || user.profile_picture,
      };

      const response = await axios.put(
        `${BACKEND_URL}/profiles/${user.id}`,
        updatedUser
      );
      console.log("User updated successfully:", response.data);
      setUserProfile(response.data);
      onClose();
      toast.success("User profile updated successfully");
      navigate("/");
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <form onSubmit={handleSubmit}>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Edit Profile
          </h3>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            className="w-full mt-3 mb-3 p-2 border rounded"
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            className="w-full mb-3 p-2 border rounded"
          />
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full mb-3 p-2 border rounded"
          />
          <button
            type="submit"
            disabled={uploading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {uploading ? "Updating..." : "Update Profile"}
          </button>
          <button
            onClick={onClose}
            className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
