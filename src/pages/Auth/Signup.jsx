import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bg from "../../assets/login back.png";
import mail from "../../assets/mail.png";
import key from "../../assets/key.png";
import contact from "../../assets/Contact.png";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  SET_ID,
  SET_LOGIN,
  SET_NAME,
  SET_ROLE,
} from "../../redux/features/auth/authSlice";

function Signup() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [full_name, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [re_password, setRe_Password] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function sign(e) {
    e.preventDefault();
    if (!full_name || !email || !password || !re_password || !role) {
      return toast.error("All fields are required");
    }
    if (password.length < 6) {
      return toast.error("Passwords must be up to 6 characters");
    }
    if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      return toast.error("Please enter a valid email");
    }
    if (password !== re_password) {
      return toast.error("Passwords do not match");
    }

    try {
      const response = await axios.post(
        `${BACKEND_URL}/user/signup`,
        { full_name, password, email, re_password, role },
        { withCredentials: true }
      );
      const data = response.data;
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.body.full_name));
      await dispatch(SET_ROLE(data.body.role));
      await dispatch(SET_ID(data.body._id));
      if (data.body && data.body.role) {
        navigate(`/cridentials/${data.body.role}/${data.body._id}`);
      } else {
        toast.error(data.message);
        setFullname("");
        setEmail("");
        setPassword("");
        setRe_Password("");
        setRole("");
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error("An error occurred during signup.");
    }
  }

  return (
    <div className="flex flex-col md:flex-row">
      <img className="hidden md:block h-screen" src={bg} alt="Background" />

      <div className="content-center mx-auto text-center w-full md:w-3/4 h-screen flex flex-col justify-center p-6">
        <h1 className="text-3xl font-bold mb-4">Signup Page</h1>
        <form onSubmit={sign} className="space-y-4">
          <select
            name="role"
            onChange={(e) => setRole(e.target.value)}
            value={role}
            required
            className="p-2 w-full md:w-1/2 mx-auto block border-2 rounded-2xl border-gray-400"
          >
            <option value="">Signup as</option>
            <option value="tourist">Tourist</option>
            <option value="hotel manager">Hotel</option>
            <option value="tour guide">Tour Agent</option>
            <option value="shop owner">Shop owner</option>
          </select>

          <div className="flex items-center w-full md:w-1/2 mx-auto my-2">
            <img
              className="p-1 w-8 border-b-2 mx-0 border-gray-400"
              src={contact}
              alt="Contact"
            />
            <input
              className="p-1 px-4 w-full block border-b-2 mx-0 border-gray-400"
              type="text"
              name="name"
              value={full_name}
              placeholder={
                ["hotel manager", "tour guide", "shop owner"].includes(role)
                  ? "Company Name"
                  : "Full name"
              }
              required
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>

          <div className="flex items-center w-full md:w-1/2 mx-auto my-2">
            <img
              className="p-1 w-8 border-b-2 mx-0 border-gray-400"
              src={mail}
              alt="Mail"
            />
            <input
              className="p-1 px-4 w-full block border-b-2 mx-0 border-gray-400"
              type="email"
              value={email}
              name="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex items-center w-full md:w-1/2 mx-auto my-2">
            <img
              className="p-1 w-8 border-b-2 mx-0 border-gray-400"
              src={key}
              alt="Key"
            />
            <input
              className="p-1 px-4 w-full block border-b-2 mx-0 border-gray-400"
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center w-full md:w-1/2 mx-auto my-2">
            <img
              className="p-1 w-8 border-b-2 mx-0 border-gray-400"
              src={key}
              alt="Key"
            />
            <input
              className="p-1 px-4 w-full block border-b-2 mx-0 border-gray-400"
              type="password"
              value={re_password}
              name="re_password"
              placeholder="Confirm Password"
              required
              onChange={(e) => setRe_Password(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="mt-3 px-10 py-2 rounded-lg text-white bg-green-600 hover:bg-green-700 transition-transform transform hover:scale-105"
          >
            SignUp
          </button>
        </form>
        <p className="mt-4">
          Already have an account{" "}
          <a className="text-blue-500" href="/login">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
