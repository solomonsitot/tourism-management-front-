import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";

function VerificationDone() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const { verifyToken } = useParams();
  const [stat, setstat] = useState(false);
  const [body, setBody] = useState([]);
  const navigate = useNavigate();

  async function verifyEmail() {
    try {
      console.log(`${BACKEND_URL}/user/verify-email/${verifyToken}`);
      const response = await axios.put(
        `${BACKEND_URL}/user/verify-email/${verifyToken}`
      );
      const { message, body, status } = response.data;
      console.log(body);
      toast.success(message);
      setstat(status);
      setBody(body);
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function changeSite() {
    try {
      if (body && body.role) {
        navigate(`/cridentials/${body.role}/${body._id}`);
      } else {
        toast.error(
          <div>
            <FontAwesomeIcon icon={faExclamationTriangle} /> Error in response
            body
          </div>
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 md:p-8">
        <p className="text-xl font-semibold mb-4">Click the Button to Verify</p>
        <button
          onClick={verifyEmail}
          className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded flex items-center ${
            stat ? "hidden" : "block"
          }`}
        >
          <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
          Click here
        </button>

        <button
          onClick={changeSite}
          className={`bg-green-700 hover:bg-green-950 text-white font-semibold py-2 px-4 rounded flex items-center ${
            stat ? "block" : "hidden"
          }
          }`}
        >
          <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
          Continue
        </button>
      </div>

      <ToastContainer />
    </div>
  );
}

export default VerificationDone;
