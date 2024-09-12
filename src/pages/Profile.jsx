import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStateValue } from "../context/StateProvider";
import EditUserModal from "../components/EditUserModal";
import { BACKEND_URL } from "../constants";

const UserProfile = () => {
  const [{ user }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BACKEND_URL}/profiles/${user.id}`);
        dispatch({
          type: "SET_USER",
          user: response.data.data,
        });
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
      setLoading(false);
    };

    if (!user) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [user, dispatch]);

  const toggleEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  const handleUserUpdate = (updatedUser) => {
    dispatch({
      type: "SET_UPDATE_USER",
      updatedUser: updatedUser,
    });
    toggleEditModal();
  };

  return (
    <div className="container mx-auto p-4 mt-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-8 text-slate-500">User Profile</h1>
        <div className="mb-6">
          <img
            src={user.profile_picture || "default_profile.jpg"} // Added fallback for profile picture
            alt="Profile"
            className="w-44 h-44 rounded-full object-cover"
          />
        </div>
        <div className="w-full text-center">
          <div className="mb-3 flex items-center justify-center">
            <label className="text-gray-600 text-sm font-bold mr-2">
              First Name:
            </label>
            <div className="text-gray-600 text-sm">{user.firstName}</div>
          </div>
          <div className="mb-3 flex items-center justify-center">
            <label className="text-gray-700 text-sm font-bold mr-2">
              Last Name:
            </label>
            <div className="text-gray-600 text-sm">{user.lastName}</div>
          </div>
          <div className="mb-3 flex items-center justify-center">
            <label className="text-gray-700 text-sm font-bold mr-2">
              Email:
            </label>
            <div className="text-gray-600 text-sm">{user.email}</div>
          </div>
        </div>
        <button
          className="mt-4 py-2 px-4 bg-green-600 text-white font-bold rounded hover:bg-green-700"
          onClick={toggleEditModal}
        >
          Edit Profile
        </button>
      </div>
      {isEditModalOpen && (
        <EditUserModal
          user={user}
          setUserProfile={handleUserUpdate}
          onClose={toggleEditModal}
        />
      )}
    </div>
  );
};

export default UserProfile;
