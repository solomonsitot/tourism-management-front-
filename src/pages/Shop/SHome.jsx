import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav";
import useRedirectLogoutUsers from "../../hooks/redirectLogoutUsers";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function SHome() {
  useRedirectLogoutUsers("/login");
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  console.log(BACKEND_URL);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/goods/get-my-products`,
          {
            withCredentials: true,
          }
        );
        console.log(response);
        setItems(response.data);
      } catch (error) {
        toast.error("Error fetching goods: " + error.message);
      }
    };
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this room?"
    );
    if (!confirmDelete) {
      return; // Cancel deletion if user does not confirm
    }
    try {
      await axios.delete(`${BACKEND_URL}/goods/delete/${id}`, {
        withCredentials: true,
      });
      setItems(items.filter((item) => item._id !== id));
      toast.success("Item deleted successfully");
    } catch (error) {
      toast.error("Error deleting item: " + error.message);
    }
  };

  const handleEdit = (id) => {
    navigate(`/shop owner/edit-product/${id}`);
  };

  return (
    <div>
      <Nav
        href0="/shop owner"
        link1="Add Product"
        href1="/shop owner/add-product"
        link2="Purchases"
        href2="/shop owner/see-purchasement"
      />
      <div className="max-w-4xl mt-20 mx-auto p-6 bg-gray-100 text-gray-800 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">My items</h2>
        <div className="space-y-6">
          {items.length > 0 ? (
            items.map((item) => (
              <div
                key={item._id}
                className="bg-white text-gray-900 p-4 rounded-md shadow-md transition-transform transform hover:scale-105"
              >
                {item.product_images && item.product_images.length > 0 && (
                  <div className="relative h-64 overflow-hidden rounded-md mb-4">
                    <img
                      src={item.product_images[0]} // Display the first image
                      alt={item.product_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2">{item.product_name}</h3>
                <p className="mb-2">{item.product_description}</p>
                <p className="font-semibold mb-2">
                  Price: ${item.product_price}
                </p>
                <p className="font-semibold mb-4">
                  Available: {item.product_available}
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleEdit(item._id)}
                    className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No items available</p>
          )}
        </div>
      </div>{" "}
    </div>
  );
}

export default SHome;
