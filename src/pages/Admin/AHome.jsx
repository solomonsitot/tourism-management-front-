import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav";
import axios from "axios";
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
} from "@fortawesome/free-solid-svg-icons";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function AHome() {
  useRedirectLogoutUsers("/login");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [modal, setModal] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [data, setData] = useState({ hotels: 0, tourists: 0, total: 0, providers: 0, shops: 0, agents: 0, banned: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/user/count-all`);
        if (response.data.success) {
          setData(response.data.data);
        }
      } catch (error) {
        toast.error("Error fetching user statistics");
      } finally {
        setLoading(false);
      }
    };
    fetchUserStats();
  }, []);



  

  const chartData = {
    labels: ["Hotels", "Shops", "Tour Guides", "Tourists"],
    datasets: [
      {
        label: "Count",
        data: [data.hotels, data.shops, data.agents, data.tourists],
        backgroundColor: ["#1E3A8A", "#10B981", "#FBBF24", "#EF4444"],
      },
    ],
  };
 

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-gray-900 text-white h-screen overflow-y-scroll">
      <Nav
        href0="/admin"
        link1="All Destinations"
        href1="/admin/add-destination"
        link2="All Blogs"
        href2="/admin/add-blog"
      />
      <div className="pt-24 overflow-y-scroll h-screen flex flex-col p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div className="grid grid-cols-2 gap-4">
            {[
              { count: data.tourists, label: "Tourists", icon: faUser, bgColor: "bg-blue-700" },
              { count: data.hotels, label: "Hotels", icon: faHotel, bgColor: "bg-green-700" },
              { count: data.total, label: "Total Cash Spent", icon: faMoneyBillWave, bgColor: "bg-yellow-700" },
              { count: data.banned, label: "Banned users", icon: faInfoCircle, bgColor: "bg-red-700" },
              { count: data.shops, label: "Shops", icon: faShop, bgColor: "bg-purple-700" },
              { count: data.agents, label: "Tour Guides", icon: faMapMarkedAlt, bgColor: "bg-orange-700" },
            ].map((item, index) => (
              <div key={index} className={`${item.bgColor} text-white rounded-lg shadow-lg p-4 flex items-center transition transform hover:scale-105`}>
                <FontAwesomeIcon icon={item.icon} size="3x" className="mr-4" />
                <div>
                  <h1 className="text-4xl font-bold">{item.count}</h1>
                  <p className="text-center">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
            <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'User Statistics' } } }} />
          </div>
        </div>



        
      </div>
    </div>
  );
}

export default AHome;
