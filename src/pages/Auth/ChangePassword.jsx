import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUnlockAlt, faKey } from "@fortawesome/free-solid-svg-icons";
import useRedirectLogoutUsers from "../../hooks/redirectLogoutUsers";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SET_LOGIN } from "../../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";

function ChangePassword() {
  useRedirectLogoutUsers("/login");
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [old_password, setOldPassword] = useState("");
  const [new_password, setNewPassword] = useState("");
  const [re_password, setRePassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function handlePasswordChange(e) {
    e.preventDefault();
    if (new_password !== re_password) {
      toast("New passwords do not match");
      return;
    }
    try {
      const response = await axios.post(
        `${BACKEND_URL}/user/change-password`,
        {
          old_password,
          re_password,
          new_password,
        },
        { withCredentials: true }
      );
      if (response.data.message === "password changed successfully") {
        const result = await axios.get(`${BACKEND_URL}/user/logout`, {
          withCredentials: true,
        });
        dispatch(SET_LOGIN(false));
        toast(response.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        toast(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
    } // Implement password change logic here
    // console.log("Password changed successfully");
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-8">Change Password</h2>
        <form onSubmit={handlePasswordChange}>
          <div className="mb-6">
            <label htmlFor="oldPassword" className="block text-gray-700 mb-2">
              Old Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <span className="px-3 bg-gray-200">
                <FontAwesomeIcon icon={faUnlockAlt} />
              </span>
              <input
                type="password"
                id="oldPassword"
                value={old_password}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full p-3 focus:outline-none"
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="newPassword" className="block text-gray-700 mb-2">
              New Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <span className="px-3 bg-gray-200">
                <FontAwesomeIcon icon={faLock} />
              </span>
              <input
                type="password"
                id="newPassword"
                value={new_password}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 focus:outline-none"
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="rePassword" className="block text-gray-700 mb-2">
              Confirm New Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <span className="px-3 bg-gray-200">
                <FontAwesomeIcon icon={faKey} />
              </span>
              <input
                type="password"
                id="rePassword"
                value={re_password}
                onChange={(e) => setRePassword(e.target.value)}
                className="w-full p-3 focus:outline-none"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
