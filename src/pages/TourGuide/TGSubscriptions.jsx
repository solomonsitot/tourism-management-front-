import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../../components/Nav";
import useRedirectLogoutUsers from "../../hooks/redirectLogoutUsers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxOpen,
  faUser,
  faCheckCircle,
  faTimesCircle,
  faVoicemail,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TGSubscriptions() {
  useRedirectLogoutUsers("/login");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    async function fetchSubscriptions() {
      try {
        const result = await axios.get(
          `${BACKEND_URL}/subscribe/get-my-subscription`,
          { withCredentials: true }
        );
        setSubscriptions(result.data);
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
        toast.error("Error fetching subscriptions.");
      }
    }
    fetchSubscriptions();
  }, []);

  return (
    <>
      <Nav
        href0="/tour guide"
        link1="Add Package"
        href1="/tour guide/add-tour"
        link2="Subscriptions"
        href2="/tour guide/see-subscriptions"
      />
      <div className="container mt-20 mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">
          My Subscriptions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {subscriptions.length > 0 ? (
            subscriptions.map((subscription) => (
              <div
                key={subscription._id}
                className="bg-white shadow-lg shadow-black rounded-lg overflow-hidden transform transition duration-500 hover:scale-105"
              >
                <div className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-800">
                      <FontAwesomeIcon icon={faBoxOpen} className="mr-2" />
                      {subscription.package.package_name}
                    </h3>
                    <FontAwesomeIcon
                      icon={
                        subscription.status === "completed"
                          ? faCheckCircle
                          : faTimesCircle
                      }
                      className={`text-2xl ${
                        subscription.status === "completed"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    />
                  </div>
                  <p className="mt-2 text-gray-600">
                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                    {subscription.customer.full_name}
                  </p>{" "}
                  <p className="mt-2 text-gray-600">
                    <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                    {subscription.customer.email}
                  </p>
                  <p className="mt-2 text-gray-600">
                    Quantity: {subscription.quantity}
                  </p>
                  <p className="mt-2 text-gray-600">
                    Status: {subscription.status}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="mt-4 text-lg text-gray-600 col-span-3 text-center">
              No subscriptions found.
            </p>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default TGSubscriptions;
