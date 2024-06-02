import React, { useEffect } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import Layout from "./layout/Layout";
import axios from "axios";
import { useDispatch } from "react-redux";
import { SET_LOGIN } from "./redux/features/auth/authSlice";
function App() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const dispacth = useDispatch();
  useEffect(() => {
    async function loginStatus() {
      const status = await axios.get(`${BACKEND_URL}/user/get-user-status`, {
        withCredentials: true,
      });
      dispacth(SET_LOGIN(status.data));
    }
    loginStatus();
  }, []);
  
  return (
    <>
      <Layout />
      <ToastContainer />
    </>
  );
}

export default App;
