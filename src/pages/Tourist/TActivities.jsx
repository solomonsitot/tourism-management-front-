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
  faBed,
  faCalendarAlt,
  faDollarSign,
  faInfoCircle,
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
        const response = await axios.get(
          `${BACKEND_URL}/user/get-my-activity`,
          { withCredentials: true }
        );
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
        <h1 className="text-3xl font-bold mb-6 text-center">My Activities</h1>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="space-y-6">
            <ActivitySection
              title="Reservations"
              icon={faHotel}
              items={data.reservations}
              renderDetails={(item) => (
                <div className="flex flex-col md:flex-row justify-between mb-4">
                  <div className="mb-2 md:mb-0">
                    <p>
                      <FontAwesomeIcon icon={faHotel} className="mr-2" />
                      Hotel: {item.hotel.full_name}
                    </p>
                    <p>
                      <FontAwesomeIcon icon={faBed} className="mr-2" />
                      Room: {item.room.room_name}
                    </p>
                  </div>
                  <div>
                    <p>
                      <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                      From: {item.from}
                    </p>
                    <p>
                      <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                      To: {item.to}
                    </p>
                  </div>
                  <div>
                    <p>
                      <FontAwesomeIcon icon={faDollarSign} className="mr-2" />
                      Price: ${item.price}
                    </p>
                    <p>
                      <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                      Status: {item.status}
                    </p>
                  </div>
                </div>
              )}
            />
            <ActivitySection
              title="Purchases"
              icon={faShoppingCart}
              items={data.purchases}
              renderDetails={(item) => (
                <div className="flex flex-col md:flex-row justify-between mb-4">
                  <div className="mb-2 md:mb-0">
                    <p>
                      <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                      Shop: {item.shop.full_name}
                    </p>
                  </div>
                  <div className="mb-2 md:mb-0">
                    <p>
                      <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                      Product: {item.product_name}
                    </p>
                  </div>
                  <div>
                    <p>
                      <FontAwesomeIcon icon={faDollarSign} className="mr-2" />
                      Price: ${item.price}
                    </p>
                    <p>
                      <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <div>
                    <p>
                      <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                      Status: {item.status}
                    </p>
                  </div>
                </div>
              )}
            />
            <ActivitySection
              title="Subscriptions"
              icon={faMapMarkedAlt}
              items={data.subscriptions}
              renderDetails={(item) => (
                <div className="flex flex-col md:flex-row justify-between mb-4">
                  <div className="mb-2 md:mb-0">
                    <p>
                      <FontAwesomeIcon icon={faMapMarkedAlt} className="mr-2" />
                      Package: {item.package.name}
                    </p>
                  </div>
                  <div>
                    <p>
                      <FontAwesomeIcon icon={faDollarSign} className="mr-2" />
                      Price: ${item.price}
                    </p>
                  </div>
                  <div>
                    <p>
                      <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                      Status: {item.status}
                    </p>
                  </div>
                </div>
              )}
            />
          </div>
        )}
      </div>
    </>
  );
}

function ActivitySection({ title, icon, items, renderDetails }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <h2 className="text-2xl font-bold mb-4 flex items-center text-blue-600">
        <FontAwesomeIcon icon={icon} className="mr-2" />
        {title}
      </h2>
      {items.length === 0 ? (
        <p className="text-gray-500">No {title.toLowerCase()} found.</p>
      ) : (
        <ul className="space-y-4">
          {items.map((item, index) => (
            <li key={index} className="border-b py-4">
              {renderDetails(item)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TActivities;
