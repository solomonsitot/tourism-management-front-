import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBlog,
  faMapMarkerAlt,
  faUsers,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { SET_LOGIN } from "../../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

function SideNav() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activeClass = "bg-blue-700 text-white";
  async function logout() {
    try {
      const response = await axios.get(`${BACKEND_URL}/user/logout`, {
        withCredentials: true,
      });
      console.log(response);
      dispatch(SET_LOGIN(false));
      navigate("/login");
    } catch (err) {
      toast(err.message);
    }
  }
  return (
    <div className="bg-gray-800 mt-20 h-[90vh] z-50 text-white flex flex-col float-start  lg:mt-[15vh]  transition-all duration-300 w-16 sm:w-64">
      <div className="flex-grow overflow-y-auto">
        <ul className="space-y-2 p-4">
          <li>
            <Link
              to="/admin"
              className={`block py-2 px-4 rounded-lg ${
                location.pathname === "/admin"
                  ? activeClass
                  : "hover:bg-gray-700"
              } flex items-center justify-center sm:justify-start`}
            >
              <FontAwesomeIcon icon={faHome} className="mr-0 sm:mr-2" />
              <span className="hidden sm:inline">Home</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/add-blog"
              className={`block py-2 px-4 rounded-lg ${
                location.pathname === "/admin/add-blog"
                  ? activeClass
                  : "hover:bg-gray-700"
              } flex items-center justify-center sm:justify-start`}
            >
              <FontAwesomeIcon icon={faBlog} className="mr-0 sm:mr-2" />
              <span className="hidden sm:inline">Blogs</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/add-destination"
              className={`block py-2 px-4 rounded-lg ${
                location.pathname === "/admin/add-destination"
                  ? activeClass
                  : "hover:bg-gray-700"
              } flex items-center justify-center sm:justify-start`}
            >
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-0 sm:mr-2" />
              <span className="hidden sm:inline">Destinations</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/manage-user"
              className={`block py-2 px-4 rounded-lg ${
                location.pathname === "/admin/manage-user"
                  ? activeClass
                  : "hover:bg-gray-700"
              } flex items-center justify-center sm:justify-start`}
            >
              <FontAwesomeIcon icon={faUsers} className="mr-0 sm:mr-2" />
              <span className="hidden sm:inline">Users</span>
            </Link>
          </li>
          <li
            className={` py-2 px-4 rounded-lg hover:bg-red-700
            flex items-center justify-center sm:justify-start`}
            onClick={logout}
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-0 sm:mr-2" />
            <span className="hidden sm:inline">logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideNav;
