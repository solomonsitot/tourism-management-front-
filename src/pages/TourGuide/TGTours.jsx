import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Nav from "../../components/Nav";
import useRedirectLogoutUsers from "../../hooks/redirectLogoutUsers";

function TGTours() {
  useRedirectLogoutUsers("/login");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    package_name: "",
    package_price: "",
    total_space: "",
    package_description: "",
    image1: null,
    image2: null,
    image3: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("package_name", formData.package_name);
    form.append("package_price", formData.package_price);
    form.append("total_space", formData.total_space);
    form.append("package_description", formData.package_description);
    form.append("image1", formData.image1);
    form.append("image2", formData.image2);
    form.append("image3", formData.image3);

    try {
      const response = await axios.post(
        `${BACKEND_URL}/tours/create-new`,
        form,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success(response.data.message);
      navigate("/tour guide");
    } catch (error) {
      toast.error("Error creating tour package: " + error.message);
    }
  };

  return (
    <>
      <Nav
        href0="/tour guide"
        link1="Add Package"
        href1="/tour guide/add-tour"
        link2="Subscriptions"
        href2="/tour guide/see-subscriptions"
      />
      <div className="max-w-4xl mt-20 mx-auto mt-10 p-6 bg-green-950 text-white rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-white">
          Add New Tour Package
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-white">Package Name:</label>
            <input
              type="text"
              name="package_name"
              value={formData.package_name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
          <div>
            <label className="block mb-2 text-white">Package Price:</label>
            <input
              type="number"
              name="package_price"
              value={formData.package_price}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
          <div>
            <label className="block mb-2 text-white">Total Space:</label>
            <input
              type="number"
              name="total_space"
              value={formData.total_space}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
          <div>
            <label className="block mb-2 text-white">Package Description:</label>
            <textarea
              name="package_description"
              value={formData.package_description}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-gold"
            ></textarea>
          </div>
          <div>
            <label className="block mb-2 text-white">Image 1:</label>
            <input
              type="file"
              name="image1"
              onChange={handleFileChange}
              required
              className="w-full p-2 border border-gray-300 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
          <div>
            <label className="block mb-2 text-white">Image 2:</label>
            <input
              type="file"
              name="image2"
              onChange={handleFileChange}
              required
              className="w-full p-2 border border-gray-300 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
          <div>
            <label className="block mb-2 text-white">Image 3:</label>
            <input
              type="file"
              name="image3"
              onChange={handleFileChange}
              required
              className="w-full p-2 border border-gray-300 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-white text-green-950 font-bold rounded hover:bg-gold-700"
          >
            Add Tour Package
          </button>
        </form>
      </div>
    </>
  );
}

export default TGTours;
