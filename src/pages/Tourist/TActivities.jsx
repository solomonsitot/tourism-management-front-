import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../../components/Nav";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHotel,
  faShoppingCart,
  faMapMarkedAlt,
} from "@fortawesome/free-solid-svg-icons";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
function TActivities() {
  const [data, setData] = useState({
    reservations: [],
    purchases: [],
    subscriptions: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/user/get-my-activity`);
        setData(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch activities");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Nav
        href0="/tourist"
        link1="Discover"
        href1="/tourist/destinations"
        link2="Blogs"
        href2="/tourist/see-blogs"
        link3="Hotels"
        href3="/tourist/see-hotels"
        link4="Tours"
        href4="/tourist/tours"
        link5="Shops"
        href5="/tourist/see-shops"
      />
      <div className="container mx-auto p-4">
        <ToastContainer />
        <h1 className="text-3xl font-bold mb-4">My Activities</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ActivitySection
              title="Reservations"
              icon={faHotel}
              items={data.reservations}
              itemName={(item) => item.hotel.name}
            />
            <ActivitySection
              title="Purchases"
              icon={faShoppingCart}
              items={data.purchases}
              itemName={(item) => item.product.name}
            />
            <ActivitySection
              title="Subscriptions"
              icon={faMapMarkedAlt}
              items={data.subscriptions}
              itemName={(item) => item.package.name}
            />
          </div>
        )}
      </div>
    </>
  );
}

function ActivitySection({ title, icon, items, itemName }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-2xl font-bold mb-2">
        <FontAwesomeIcon icon={icon} className="mr-2" />
        {title}
      </h2>
      {items.length === 0 ? (
        <p>No {title.toLowerCase()} found.</p>
      ) : (
        <ul>
          {items.map((item, index) => (
            <li key={index} className="border-b py-2">
              {itemName(item)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TActivities;
