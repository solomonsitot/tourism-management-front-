import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSave,
  faPassport,
  faPhone,
  faBuilding,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

const UpdateCredentials = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [userData, setUserData] = useState(null);
  const [isTourist, setIsTourist] = useState(false);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/profile/get-credential`, { withCredentials: true })
      .then((response) => {
        setUserData(response.data.body);
        setIsTourist(response.data.body._id.role === "tourist");
      })
      .catch((error) => {
        toast.error("Failed to fetch user data");
        console.error(error);
      });
  }, [BACKEND_URL]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    setUserData({ ...userData, [name]: file });

    // const reader = new FileReader();
    // reader.onloadend = () => {
    //   setUserData((prevState) => ({
    //     ...prevState,
    //     [`${name}`]: reader.result,
    //   }));
    // };
    // reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    const formData = new FormData();
    Object.keys(userData).forEach((key) => {
      if (key === "profile_image" && userData[key] instanceof File) {
        formData.append(key, userData[key]);
      } else if (key === "_id") {
        Object.keys(userData[key]).forEach((subKey) => {
          formData.append(`${key}.${subKey}`, userData[key][subKey]);
        });
      } else {
        formData.append(key, userData[key]);
      }
    });

    const url = isTourist
      ? `${BACKEND_URL}/profile/update-tourist-credential`
      : `${BACKEND_URL}/profile/update-provider-credential`;

    try {
      const response = await axios.put(url, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      toast.success("User data updated successfully");
      setTimeout(() => {
        window.history.back();
      }, 3000);
    } catch (error) {
      toast.error("Failed to update user data");
      console.error(error);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <ToastContainer />
      <h2 className="text-2xl font-bold text-center mb-6">
        Update User Credentials
      </h2>
      <form className="space-y-4">
        {isTourist ? (
          <>
            <div className="form-group">
              <label className="flex items-center">
                <FontAwesomeIcon icon={faPassport} className="mr-2" /> Passport
                ID
              </label>
              <input
                type="text"
                name="passport_id"
                value={userData.passport_id}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="form-group">
              <label className="flex items-center">
                <FontAwesomeIcon icon={faPhone} className="mr-2" /> Phone Number
              </label>
              <input
                type="text"
                name="phone_number"
                value={userData.phone_number}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </>
        ) : (
          <>
            <div className="form-group">
              <label className="flex items-center">
                <FontAwesomeIcon icon={faBuilding} className="mr-2" /> Company
                Name
              </label>
              <input
                type="text"
                name="company_name"
                value={userData.company_name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={userData.description}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              ></textarea>
            </div>
            <div className="form-group">
              <label className="flex items-center">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />{" "}
                Address
              </label>
              <input
                type="text"
                name="address"
                value={userData.address}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </>
        )}
        <div className="form-group">
          <label>Profile Image</label>
          <input
            type="file"
            name="profile_image"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {userData.profile_image && (
            <img
              src={userData.profile_image}
              alt="Profile"
              className="mt-2 w-32 h-32 object-cover rounded-full"
            />
          )}
        </div>
        <button
          type="button"
          onClick={handleSave}
          className="flex items-center justify-center w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <FontAwesomeIcon icon={faSave} className="mr-2" /> Save
        </button>
      </form>
    </div>
  );
};

export default UpdateCredentials;
