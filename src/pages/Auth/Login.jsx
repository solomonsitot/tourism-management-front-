import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import bg from "../../assets/login back.png";
import mail from "../../assets/mail.png";
import key from "../../assets/key.png";
import { useDispatch } from "react-redux";
import {
  SET_ID,
  SET_LOGIN,
  SET_NAME,
  SET_ROLE,
} from "../../redux/features/auth/authSlice";
import axios from "axios";
function Login() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [email, setEmail] = useState();
  const [emails, setEmails] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function login(e) {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("All fields are required");
    }
    if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      return toast.error("Please enter a valid email");
    }
    if (password.length < 6) {
      return toast.error("Passwords must be up to 6 characters");
    }
    try {
      const response = await fetch(`${BACKEND_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
        credentials: "include",
      });
      const data = await response.json();
      setMessage(data.message);
      setEmails(data.email);
      if (data.body) {
        await dispatch(SET_LOGIN(true));
        await dispatch(SET_NAME(data.body.full_name));
        await dispatch(SET_ROLE(data.body.role));
        await dispatch(SET_ID(data.body._id));

        if (data.body.role === "tourist") {
          navigate(`/tourist`);
        } else if (data.body.role === "hotel manager") {
          navigate(`/hotel manager`);
        } else if (data.body.role === "shop owner") {
          navigate(`/shop owner`);
        } else if (data.body.role === "tour guide") {
          navigate(`/tour guide`);
        } else if (data.body.role === "admin") {
          navigate(`/admin`);
        }
      } else {
        toast(`${data.message}`);
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.log("Error occurred during login:", error);
    }
  }
  async function resendEmail() {
    const response = await axios.post(`${BACKEND_URL}/user/resend-email`);
    toast(response.data.message);
  }
  return (
    <>
      <div className="flex">
        <img className="hidden md:block  h-full" src={bg} alt="" />
        <div className=" content-center mx-auto text-center w-3/4  h-screen ">
          <h1 className="text-3xl  font-bold mb-4">Login Page</h1>
          <div className="flex w-full justify-center">
            <img
              className=" p-1 w-8  border-b-2  mx-0 border-gray-400"
              src={mail}
              alt=""
            />
            <input
              className="py-1 px-4 w-1/2  border-b-2  mx-0 border-gray-400"
              type="text"
              name="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex w-full justify-center">
            <img
              className=" p-1 w-8  border-b-2  mx-0 border-gray-400"
              src={key}
              alt=""
            />
            <input
              className="py-1 px-4 w-1/2 border-b-2 mx-0 border-gray-400"
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            onClick={login}
            className="mt-3 px-10 py-2 rounded-lg text-white bg-green-950  "
          >
            Login
          </button>
          <p className="my-4">
            <a className="text-blue-500" href="/forgot-password">
              forgot password
            </a>
            {" have No account "}
            <a className="text-blue-500" href="/signup">
              SignUp
            </a>
          </p>
          <p
            className={`${
              message === "please confirm your email to login"
                ? "block"
                : "hidden"
            }`}
          >
            {"Email expires? "}
            <span className="text-blue-500 underline" onClick={resendEmail}>
              Resend Again
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
