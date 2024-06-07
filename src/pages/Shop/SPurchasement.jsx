import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav";
import useRedirectLogoutUsers from "../../hooks/redirectLogoutUsers";
import axios from "axios";

function SPurchasement() {
  useRedirectLogoutUsers("/login");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [purchases, setPurchases] = useState([]);
  useEffect(() => {
    async function fetchPurchases() {
      try {
        const result = await axios.get(
          `${BACKEND_URL}/purchase/get-my-purchases`,
          { withCredentials: true }
        );
        setPurchases(result.data);
        console.log("Fetched purchases:", result.data);
      } catch (error) {
        console.error("Error fetching purchases:", error);
      }
    }
    fetchPurchases();
  }, [BACKEND_URL]);

  return (
    <div>
      <Nav
        href0="/shop owner"
        link1="Add Product"
        href1="/shop owner/add-product"
        link2="Purchases"
        href2="/shop owner/see-purchasement"
      />
      <div className="min-h-screen mt-20 bg-green-950 text-white p-8">
        <h1 className="text-4xl font-bold text-center mb-8">Purchases</h1>
        {purchases.length === 0 ? (
          <p className="text-xl text-center">No purchases found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {purchases.map((purchase) => (
              <div
                key={purchase._id}
                className="bg-green-900 rounded-lg p-6 shadow-lg"
              >
                <h2 className="text-xl font-bold mb-4">
                  {purchase.product.product_name}
                </h2>{" "}
                <p className="text-lg mb-2">
                  <span className="font-semibold">Customer:</span>{" "}
                  {purchase.customer.full_name}{" "}
                </p>
                <p className="text-lg mb-2">
                  <span className="font-semibold">Quantity:</span>{" "}
                  {purchase.quantity}
                </p>
                <p className="text-lg mb-2">
                  <span className="font-semibold">Status:</span>{" "}
                  <span
                    className={`px-2 py-1 rounded-full ${
                      purchase.status === "Confirmed"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {purchase.status}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>{" "}
    </div>
  );
}

export default SPurchasement;
