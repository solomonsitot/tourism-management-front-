import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { toast } from "react-toastify";
import {
  SET_LOGIN,
  selectIsLoggedIn,
  selectRole,
} from "../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaCog,
  FaBars,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";

function Nav(props) {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [mobileMenu, setMobileMenu] = useState(false);
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const role = useSelector(selectRole);
  const obj = [
    {
      href: props.href0,
    },
    {
      href: props.href1,
      link: props.link1,
    },
    {
      href: props.href2,
      link: props.link2,
    },
    {
      href: props.href3,
      link: props.link3,
    },
    {
      href: props.href4,
      link: props.link4,
    },
  ];

  async function logout() {
    try {
      const response = await axios.get(`${BACKEND_URL}/user/logout`,
        {
        withCredentials: true,
        }
      );
      console.log(response);
      dispatch(SET_LOGIN(false));
      navigate("/login");
    } catch (err) {
      toast(err.message);
    }
  }

  return (
    <>
      <div className="flex justify-between p-4 pt-6 bg-white shadow-md">
        <div className="text-green-950">
          <a href={props.href0}>
            <h2 className="text-5xl font-bold">TripMate</h2>
          </a>
        </div>
        <div className="hidden md:flex items-center gap-4">
          {obj.map((nav, index) => (
            <a
              key={index}
              className={`text-green-950 no-underline ${
                isLoggedIn ? "flex" : "hidden"
              }`}
              href={nav.href}
            >
              {nav.link}
            </a>
          ))}
          {isLoggedIn && role !== "admin" && (
            <FaCog
              className="h-7 cursor-pointer text-green-950"
              onClick={() => setModal(true)}
            />
          )}
          {!isLoggedIn && (
            <>
              <a
                className="bg-green-950 text-white px-4 py-3 rounded-xl"
                href="/signup"
              >
                <FaUserPlus className="inline mr-2" /> Signup
              </a>
              <a
                className="bg-green-950 text-white px-4 py-3 rounded-xl"
                href="/login"
              >
                <FaSignInAlt className="inline mr-2" /> Login
              </a>
            </>
          )}
          {isLoggedIn && (
            <a
              className="bg-green-950 text-white px-4 py-3 rounded-xl"
              href="/login"
              onClick={logout}
            >
              <FaSignOutAlt className="inline mr-2" /> Logout
            </a>
          )}
        </div>
        <FaBars
          className="h-7 md:hidden cursor-pointer text-green-950"
          onClick={() => setMobileMenu(!mobileMenu)}
        />
      </div>
      {mobileMenu && (
        <div className="md:hidden flex flex-col items-center bg-white shadow-md py-4">
          {obj.map((nav, index) => (
            <a
              key={index}
              className={`text-green-950 no-underline py-2 ${
                isLoggedIn ? "block" : "hidden"
              }`}
              href={nav.href}
              onClick={() => setMobileMenu(false)}
            >
              {nav.link}
            </a>
          ))}
          {isLoggedIn && (
            <FaCog
              className="h-7 cursor-pointer text-green-950 my-2"
              onClick={() => {
                setModal(true);
                setMobileMenu(false);
              }}
            />
          )}
          {!isLoggedIn && (
            <>
              <a
                className="bg-green-950 text-white px-4 py-3 rounded-xl my-2"
                href="/signup"
                onClick={() => setMobileMenu(false)}
              >
                <FaUserPlus className="inline mr-2" /> Signup
              </a>
              <a
                className="bg-green-950 text-white px-4 py-3 rounded-xl my-2"
                href="/login"
                onClick={() => setMobileMenu(false)}
              >
                <FaSignInAlt className="inline mr-2" /> Login
              </a>
            </>
          )}
          {isLoggedIn && (
            <a
              className="bg-green-950 text-white px-4 py-3 rounded-xl my-2"
              href="/login"
              onClick={() => {
                logout();
                setMobileMenu(false);
              }}
            >
              <FaSignOutAlt className="inline mr-2" /> Logout
            </a>
          )}
        </div>
      )}
      {modal && <Modal onClose={() => setModal(false)} />}
    </>
  );
}

export default Nav;
