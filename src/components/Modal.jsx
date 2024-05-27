import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectId, selectRole } from "../redux/features/auth/authSlice";

function Modal({ onClose }) {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [userInfo, setUserInfo] = useState(null);
  // const [role, setRole] = useState("");
  const id = useSelector(selectId);
  const role = useSelector(selectRole);
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/profile/get-credential`, {
        withCredentials: true,
      })
      .then((response) => {
        setUserInfo(response.data.body);
      })
      .catch((error) => {
        console.error("Error fetching user info:", error);
      });
  }, [id]);

  return (
    <div
      className={`fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-50 
        "block" 
      `}
    >
      <div className="relative w-full max-w-md m-auto mt-20 md:mt-0 md:ml-auto md:mr-0 md:h-full md:max-w-sm">
        <div className="bg-white rounded-lg shadow-lg h-full flex flex-col">
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
              role === "tourist" ? (
                <div>
                  <img
                    src={userInfo.profile_image}
                    alt="Profile"
                    className="w-24 h-24 rounded-full mx-auto"
                  />
                  <p className="text-gray-700 mt-4">
                    <strong>Passport ID:</strong> {userInfo.passport_id}
                  </p>
                  <p className="text-gray-700 mt-2">
                    <strong>Phone Number:</strong> {userInfo.phone_number}
                  </p>
                </div>
              ) : (
                <div>
                  <img
                    src={userInfo.profile_image}
                    alt="Profile"
                    className="w-24 h-24 rounded-full mx-auto"
                  />
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
              )
            ) : (
              <p className="text-gray-700">Loading user information...</p>
            )}
          </div>
          <div className="p-4 border-t border-gray-200 flex justify-between">
            <button
              className="bg-green-950 text-white px-4 py-2 rounded-xl"
              onClick={() => {
                /* Add edit functionality */
              }}
            >
              Edit
            </button>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-xl"
              onClick={() => {
                /* Add logout functionality */
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
