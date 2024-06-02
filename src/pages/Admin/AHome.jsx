import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav";
import axios from "axios";
import BlogModal from "../../components/modals/BlogModal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import useRedirectLogoutUsers from "../../hooks/redirectLogoutUsers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHotel,
  faMoneyBillWave,
  faInfoCircle,
  faShop,
  faMapMarkedAlt,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function AHome() {
  useRedirectLogoutUsers("/login");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [modal, setModal] = useState(false);
  const [blogObj, setBlogObject] = useState([]);
  const [blogObj2, setBlogObject2] = useState([]);
  const [data, setData] = useState({ hotels: 0, tourists: 0, total: 0, providers: 0, shops: 0, agents: 0, banned: 0 });
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

  const chartData = {
    labels: ["Hotels", "Shops", "Tour Guides", "Tourists"],
    datasets: [
      {
        label: "Count",
        data: [data.hotels, data.shops, data.agents, data.tourists],
        backgroundColor: ["#8884d8", "#82ca9d", "#ffc658", "#ff7f0e"],
      },
    ],
  };

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
    <div className="bg-gray-900 text-white h-screen overflow-y-scroll">
      <Nav
        href0="/admin"
        link1="Destinations"
        href1="/admin/add-destination"
        link2="Blogs"
        href2="/admin/add-blog"
        link3="Users"
        href3="/admin/manage-user"
      />
      <div className="pt-24 overflow-y-scroll h-screen flex flex-col  p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-700 text-white rounded-lg shadow-lg p-4 flex items-center transition transform hover:scale-105">
              <FontAwesomeIcon icon={faUser} size="3x" className="mr-4" />
              <div>
                <h1 className="text-4xl font-bold">{data.tourists}</h1>
                <p className="text-center">Tourists</p>
              </div>
            </div>
            <div className="bg-green-700 text-white rounded-lg shadow-lg p-4 flex items-center transition transform hover:scale-105">
              <FontAwesomeIcon icon={faHotel} size="3x" className="mr-4" />
              <div>
                <h1 className="text-4xl font-bold">{data.hotels}</h1>
                <p className="text-center">Hotels</p>
              </div>
            </div>
            <div className="bg-yellow-700 text-white rounded-lg shadow-lg p-4 flex items-center transition transform hover:scale-105">
              <FontAwesomeIcon icon={faMoneyBillWave} size="3x" className="mr-4" />
              <div>
                <h1 className="text-4xl font-bold">${data.total}</h1>
                <p className="text-center">Total Cash Spent</p>
              </div>
            </div>
            <div className="bg-red-700 text-white rounded-lg shadow-lg p-4 flex items-center transition transform hover:scale-105">
              <FontAwesomeIcon icon={faInfoCircle} size="3x" className="mr-4" />
              <div>
                <h1 className="text-4xl font-bold">{data.banned}</h1>
                <p className="text-center">Banned users</p>
              </div>
            </div>
            <div className="bg-purple-700 text-white rounded-lg shadow-lg p-4 flex items-center transition transform hover:scale-105">
              <FontAwesomeIcon icon={faShop} size="3x" className="mr-4" />
              <div>
                <h1 className="text-4xl font-bold">{data.shops}</h1>
                <p className="text-center">Shops</p>
              </div>
            </div>
            <div className="bg-orange-700 text-white rounded-lg shadow-lg p-4 flex items-center transition transform hover:scale-105">
              <FontAwesomeIcon icon={faMapMarkedAlt} size="3x" className="mr-4" />
              <div>
                <h1 className="text-4xl font-bold">{data.agents}</h1>
                <p className="text-center">Tour Guides</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
            <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'User Statistics' } } }} />
          </div>
        </div>

        <h1 className="text-center font-bold my-5 text-4xl text-green-400">
          All Blogs
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-[97%] mx-auto">
          {blogObj.map((blog, index) => (
            <div
              key={index}
              className="bg-gray-800 text-white pb-2 rounded-lg overflow-hidden shadow-md shadow-gray-600 relative transition transform hover:scale-105"
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
              className="bg-gray-800 text-white pb-2 rounded-lg overflow-hidden shadow-md shadow-gray-600 relative transition transform hover:scale-105"
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
    </div>
  );
}

export default AHome;
