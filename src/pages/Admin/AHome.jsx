import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav";
import axios from "axios";
import BlogModal from "../../components/modals/BlogModal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useRedirectLogoutUsers from "../../hooks/redirectLogoutUsers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHotel,
  faMoneyBillWave,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
function AHome() {
  useRedirectLogoutUsers("/login");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [modal, setModal] = useState(false);
  const [blogObj, setBlogObject] = useState([]);
  const [blogObj2, setBlogObject2] = useState([]);
  const [data, setData] = useState({ hotels: 0, tourists: 0, cashSpent: 0 });
  const [Bid, setBid] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/user/count-all`);
        if (response.data.success) {
          setData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };
    fetchData();
  }, []);

  const chartData = [
    { name: "Hotels", count: data.hotels, fill: "#8884d8" },
    { name: "Shops", count: data.shops, fill: "#8884d8" },
    { name: "Tour Guides", count: data.agents, fill: "#8884d8" },
    { name: "Tourists", count: data.tourists, fill: "#82ca9d" },
  ];

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(`${BACKEND_URL}/blogs/get-all`, {
        withCredentials: true,
      });
      setBlogObject(result.data);
    }
    fetchData();

    async function fetchData2() {
      const result = await axios.get(`${BACKEND_URL}/destinations/get-all`, {
        withCredentials: true,
      });
      setBlogObject2(result.data);
    }
    fetchData2();
  }, []);

  async function deleteBlog(bid) {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      try {
        await axios.delete(`${BACKEND_URL}/blogs/delete/${bid}`, {
          withCredentials: true,
        });
        toast.success("Blog deleted successfully.");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } catch (error) {
        console.error("Error deleting blog:", error);
        toast.error("An error occurred while deleting the blog.");
      }
    }
  }

  async function deleteDestination(did) {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      try {
        await axios.delete(`${BACKEND_URL}/destinations/delete/${did}`, {
          withCredentials: true,
        });
        toast.success("Destination deleted successfully.");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } catch (error) {
        console.error("Error deleting destination:", error);
        toast.error("An error occurred while deleting the destination.");
      }
    }
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Nav
        href0="/admin"
        link1="Destinations"
        href1="/admin/add-destination"
        link2="Blogs"
        href2="/admin/add-blog"
        link3="Users"
        href3="/admin/manage-user"
      />
      <div className="min-h-screen flex flex-col lg:flex-row justify-center p-4">
        <div className="lg:w-1/2 flex flex-wrap justify-center lg:justify-start mb-4 lg:mb-0 space-y-4 lg:space-y-0">
          <div className="bg-blue-700 text-white rounded-lg shadow-lg w-full sm:w-5/12 lg:w-5/12 mx-2 mb-4 lg:mb-0 p-4 flex items-center">
            <FontAwesomeIcon icon={faUser} size="3x" className="mr-4" />
            <div>
              <h1 className="text-4xl font-bold">{data.tourists}</h1>
              <p className="text-center">Tourists visited</p>
            </div>
          </div>
          <div className="bg-green-700 text-white rounded-lg shadow-lg w-full sm:w-5/12 lg:w-5/12 mx-2 mb-4 lg:mb-0 p-4 flex items-center">
            <FontAwesomeIcon icon={faHotel} size="3x" className="mr-4" />
            <div>
              <h1 className="text-4xl font-bold">{data.providers}</h1>
              <p className="text-center">Providers</p>
            </div>
          </div>
          <div className="bg-yellow-700 text-white rounded-lg shadow-lg w-full sm:w-5/12 lg:w-5/12 mx-2 mb-4 lg:mb-0 p-4 flex items-center">
            <FontAwesomeIcon
              icon={faMoneyBillWave}
              size="3x"
              className="mr-4"
            />
            <div>
              <h1 className="text-4xl font-bold">${data.cashSpent}</h1>
              <p className="text-center">Total Cash Spent</p>
            </div>
          </div>
          <div className="bg-red-700 text-white rounded-lg shadow-lg w-full sm:w-5/12 lg:w-5/12 mx-2 mb-4 lg:mb-0 p-4 flex items-center">
            <FontAwesomeIcon icon={faInfoCircle} size="3x" className="mr-4" />
            <div>
              <h1 className="text-4xl font-bold">{data.banned}</h1>
              <p className="text-center">Banned users</p>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 max-w-4xl bg-gray-800 p-8 rounded-lg shadow-lg">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#ffffff" />
              <YAxis stroke="#ffffff" />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <h1 className="text-center font-bold my-5 text-4xl text-green-400">
        All Blogs
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-[97%] mx-auto">
        {blogObj.map((blog, index) => (
          <div
            key={index}
            className="bg-gray-800 text-white pb-2 rounded-lg overflow-hidden shadow-md shadow-gray-600 relative"
          >
            <img
              className="h-[300px] w-full object-cover"
              src={blog.blog_image}
              alt={blog.blog_title}
            />
            <div className="p-4">
              <p className="font-bold border-l-4 my-1 text-xl px-3 py-1 border-l-green-400">
                {blog.blog_title}
              </p>
              <p className="my-1 text-gray-300 h-28 overflow-y-scroll">
                {blog.blog_description}
              </p>
              <div className="flex justify-between items-center mt-4">
                <p className="text-gray-400 text-sm">{blog.BlogDate}</p>
                <div className="flex my-5 space-x-2">
                  <button
                    className="text-sm text-red-400 bg-red-900 px-3 py-1 rounded-lg"
                    onClick={() => deleteBlog(blog._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="text-sm text-green-400 bg-green-900 px-3 py-1 rounded-lg"
                    onClick={() => {
                      navigate(`blogs/edit/${blog._id}`);
                    }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h1 className="text-center font-bold my-5 text-4xl text-green-400">
        All Destinations
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-[97%] mx-auto">
        {blogObj2.map((dest, index) => (
          <div
            key={index}
            className="bg-gray-800 text-white pb-2 rounded-lg overflow-hidden shadow-md shadow-gray-600 relative"
          >
            <img
              className="h-[300px] w-full object-cover"
              src={dest.dest_image}
              alt={dest.dest_name}
            />
            <div className="p-4">
              <p className="font-bold border-l-4 my-1 text-xl px-3 py-1 border-l-green-400">
                {dest.dest_name}
              </p>
              <p className="text-gray-300">
                {dest.dest_location.lat}N , {dest.dest_location.lng}E
              </p>
              <p className="text-gray-300 h-28 overflow-y-scroll">
                {dest.dest_description}
              </p>
              <div className="flex space-x-2 my-5 justify-end">
                <button
                  className="text-sm text-red-400 bg-red-900 px-3 py-1 rounded-lg"
                  onClick={() => deleteDestination(dest._id)}
                >
                  Delete
                </button>
                <button
                  className="text-sm text-green-400 bg-green-900 px-3 py-1 rounded-lg"
                  onClick={() => {
                    navigate(`destinations/edit/${dest._id}`);
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {modal && (
        <BlogModal
          id={Bid}
          onClose={() => {
            setModal(false);
          }}
        />
      )}
    </div>
  );
}

export default AHome;
