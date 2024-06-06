import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faPhone,
  faIdCard,
  faBuilding,
  faFileAlt,
  faMapMarkerAlt,
  faFileImage,
  faFileContract,
  faUniversity,
  faUser,
  faMoneyCheck,
} from "@fortawesome/free-solid-svg-icons";

function Cridential() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const { id, role } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    profile_image: "",
    phone_number: "",
    passport_id: "",
    company_name: "",
    description: "",
    address: "",
    image1: "",
    image2: "",
    image3: "",
    bussiness_license: "",
    bank: "",
    acc_name: "",
    acc_number: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    try {
      const url =
        role === "tourist"
          ? `${BACKEND_URL}/profile/tourist-credential/${id}`
          : `${BACKEND_URL}/profile/provider-credential/${id}`;
      const response = await axios.post(url, formDataToSend);
      console.log(response.data);
      if (response.data.message === "user signup successfully") {
        if (role === "tourist") {
          navigate(`/tourist`);
        } else if (role === "hotel manager") {
          navigate(`/hotel manager`);
        } else if (role === "shop owner") {
          navigate(`/shop owner`);
        } else if (role === "tour guide") {
          navigate(`/tour guide`);
        }
      } else {
        alert("Error: " + response.data.message);
      }
    } catch (error) {
      console.log("Error submitting form:", error);
      alert("An error occurred while submitting the form. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-green-800 mb-6">
        User Information
      </h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-lg shadow-lg"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-medium text-gray-700">
              <FontAwesomeIcon icon={faCamera} className="mr-2" />
              Profile Image
            </label>
            <input
              type="file"
              name="profile_image"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          {role === "tourist" ? (
            <>
              <div>
                <label className="block text-lg font-medium text-gray-700">
                  <FontAwesomeIcon icon={faPhone} className="mr-2" />
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone_number"
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700">
                  <FontAwesomeIcon icon={faIdCard} className="mr-2" />
                  Passport ID
                </label>
                <input
                  type="text"
                  name="passport_id"
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-lg font-medium text-gray-700">
                  <FontAwesomeIcon icon={faBuilding} className="mr-2" />
                  Company Name
                </label>
                <input
                  type="text"
                  name="company_name"
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700">
                  <FontAwesomeIcon icon={faFileAlt} className="mr-2" />
                  Description
                </label>
                <textarea
                  name="description"
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                ></textarea>
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700">
                  <FontAwesomeIcon icon={faFileImage} className="mr-2" />
                  Image 1
                </label>
                <input
                  type="file"
                  name="image1"
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700">
                  <FontAwesomeIcon icon={faFileImage} className="mr-2" />
                  Image 2
                </label>
                <input
                  type="file"
                  name="image2"
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700">
                  <FontAwesomeIcon icon={faFileImage} className="mr-2" />
                  Image 3
                </label>
                <input
                  type="file"
                  name="image3"
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700">
                  <FontAwesomeIcon icon={faFileContract} className="mr-2" />
                  Business License
                </label>
                <input
                  type="file"
                  name="bussiness_license"
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700">
                  <FontAwesomeIcon icon={faUniversity} className="mr-2" />
                  Bank
                </label>
                <select
                  name="bank"
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select Bank</option>
                  <option value="Awash Bank">Awash Bank</option>
                  <option value="Bank of Abyssinia">Bank of Abyssinia</option>
                  <option value="Commercial Bank of Ethiopia (CBE)">
                    Commercial Bank of Ethiopia (CBE)
                  </option>
                  <option value="Dashen Bank">Dashen Bank</option>
                  <option value="telebirr">telebirr</option>
                  <option value="M-Pesa">M-Pesa</option>
                </select>
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700">
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                  Account Name
                </label>
                <input
                  type="text"
                  name="acc_name"
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700">
                  <FontAwesomeIcon icon={faMoneyCheck} className="mr-2" />
                  Account Number
                </label>
                <input
                  type="text"
                  name="acc_number"
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </>
          )}
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white font-bold px-6 py-2 rounded-full transition-transform transform hover:scale-105 hover:bg-green-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Cridential;
