import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserEdit,
  faSignOutAlt,
  faKey,
  faEnvelope,
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  SET_LOGIN,
  selectId,
  selectRole,
} from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";

function Modal({ onClose }) {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [userInfo, setUserInfo] = useState(null);
  const id = useSelector(selectId);
  const role = useSelector(selectRole);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/profile/get-credential`, { withCredentials: true })
      .then((response) => {
        setUserInfo(response.data.body);
      })
      .catch((error) => {
        console.error("Error fetching user info:", error);
      });
  }, [id]);

  async function logout() {
    try {
      const response = await axios.get(`${BACKEND_URL}/user/logout`, {
        withCredentials: true,
      });
      console.log(response);
      dispatch(SET_LOGIN(false));
      toast(response.data.message);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      toast(err.message);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end items-center">
      <div className="w-80 bg-white shadow-lg h-full flex flex-col">
        <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200">
          <h3 className="text-lg font-semibold">User Information</h3>
          <button onClick={onClose}>
            <svg
              className="w-6 h-6 text-gray-600 hover:text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <div className="p-4 flex-grow overflow-y-auto">
          {userInfo ? (
            <div>
              <img
                src={userInfo.profile_image}
                alt="Profile"
                className="w-24 h-24 rounded-full mx-auto"
              />
              <p className="text-gray-700 mt-4">
                <strong>Full Name:</strong> {userInfo._id.full_name}
              </p>
              <p className="text-gray-700 mt-2 flex items-center">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                <strong>Email:</strong> {userInfo._id.email}
              </p>
              <p className="text-gray-700 mt-2 flex items-center">
                {userInfo._id.verification_status === "verified" ? (
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-green-500 mr-2"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    className="text-red-500 mr-2"
                  />
                )}
                <strong>Status:</strong> {userInfo._id.verification_status}
              </p>
              {role === "tourist" ? (
                <div>
                  <p className="text-gray-700 mt-4">
                    <strong>Passport ID:</strong> {userInfo.passport_id}
                  </p>
                  <p className="text-gray-700 mt-2">
                    <strong>Phone Number:</strong> {userInfo.phone_number}
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-gray-700 mt-4">
                    <strong>Company Name:</strong> {userInfo.company_name}
                  </p>
                  <p className="text-gray-700 mt-2">
                    <strong>Description:</strong> {userInfo.description}
                  </p>
                  <p className="text-gray-700 mt-2">
                    <strong>Address:</strong> {userInfo.address}
                  </p>
                  <div className="mt-4">
                    {userInfo.images.slice(0, 3).map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Image ${index + 1}`}
                        className="w-24 h-24 rounded mx-1 inline-block"
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mt-2">
                    <strong>Business License:</strong>{" "}
                    <a
                      href={userInfo.bussiness_license}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      View
                    </a>
                  </p>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-700">Loading user information...</p>
          )}
        </div>
        <div className="p-4 border-t border-gray-200">
          <button
            className="bg-blue-500 text-white w-full py-2 rounded-xl mb-2 hover:bg-blue-600 flex items-center justify-center"
            onClick={() => {
              navigate("/update-cridential");
            }}
          >
            <FontAwesomeIcon icon={faUserEdit} className="mr-2" /> Edit Profile
          </button>
          <button
            className="bg-yellow-500 text-white w-full py-2 rounded-xl mb-2 hover:bg-yellow-600 flex items-center justify-center"
            onClick={() => {
              navigate("/change-password");
            }}
          >
            <FontAwesomeIcon icon={faKey} className="mr-2" /> Change Password
          </button>
          <button
            className="bg-red-500 text-white w-full py-2 rounded-xl hover:bg-red-600 flex items-center justify-center"
            onClick={() => {
              logout();
            }}
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
