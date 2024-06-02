import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../../components/Nav";
import useRedirectLogoutUsers from "../../hooks/redirectLogoutUsers";

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
        <h2 className="text-2xl font-semibold mt-8 mb-4">My Subscriptions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {subscriptions.length > 0 ? (
            subscriptions.map((subscription) => (
              <div
                key={subscription._id}
                className="bg-white shadow overflow-hidden rounded-lg"
              >
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Package: {subscription.package.package_name}
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Customer: {subscription.customer.full_name}
                  </p>
                </div>
                <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
                  <p className="mt-1 text-sm text-gray-900">
                    Quantity: {subscription.quantity}
                  </p>
                  <p className="mt-1 text-sm text-gray-900">
                    Status: {subscription.status}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="mt-4 text-lg text-gray-600">No subscriptions found.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default TGSubscriptions;
