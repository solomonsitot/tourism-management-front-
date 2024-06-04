import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faEye,
  faPlus,
  faFileUpload,
  faSave,
  faMoneyBillWave,
  faUsers,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import Nav from "../../components/Nav";
import useRedirectLogoutUsers from "../../hooks/redirectLogoutUsers";
import "react-toastify/dist/ReactToastify.css";

function TGTourEdit() {
  useRedirectLogoutUsers("/login");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const { id } = useParams();
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
  const [previewImages, setPreviewImages] = useState({
    image1: null,
    image2: null,
    image3: null,
  });

  useEffect(() => {
    async function fetchTour() {
      try {
        const result = await axios.get(
          `${BACKEND_URL}/tours/get-single/${id}`,
          {
            withCredentials: true,
          }
        );
        const tour = result.data;

        console.log("Fetched tour data:", tour);

        setFormData({
          package_name: tour.package_name || "",
          package_price: tour.package_price || "",
          total_space: tour.total_space || "",
          package_description: tour.package_description || "",
          image1: (tour.image && tour.image[0]) || null,
          image2: (tour.image && tour.image[1]) || null,
          image3: (tour.image && tour.image[2]) || null,
        });

        setPreviewImages({
          image1: (tour.image && tour.image[0]) || null,
          image2: (tour.image && tour.image[1]) || null,
          image3: (tour.image && tour.image[2]) || null,
        });
      } catch (error) {
        toast.error("Error fetching tour details: " + error.message);
      }
    }
    fetchTour();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
      setPreviewImages({
        ...previewImages,
        [name]: URL.createObjectURL(files[0]),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("package_name", formData.package_name);
    form.append("package_price", formData.package_price);
    form.append("total_space", formData.total_space);
    form.append("package_description", formData.package_description);
    if (formData.image1 instanceof File) form.append("image1", formData.image1);
    if (formData.image2 instanceof File) form.append("image2", formData.image2);
    if (formData.image3 instanceof File) form.append("image3", formData.image3);
    try {
      const response = await axios.put(
        `${BACKEND_URL}/tours/update/${id}`,
        form,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success(response.data.message);
      navigate("/tour guide");
    } catch (error) {
      toast.error("Error updating tour package: " + error.message);
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
        icon1={<FontAwesomeIcon icon={faPlus} />}
        icon2={<FontAwesomeIcon icon={faEye} />}
        icon3={<FontAwesomeIcon icon={faSignOutAlt} />}
      />
      <div className="max-w-6xl mt-20 mx-auto p-6 shadow-2xl bg-green-50 text-green-950 rounded-md  flex flex-col md:flex-row">
        <div className="md:w-2/3 md:pr-6">
          <h2 className="text-3xl font-bold mb-6 text-center text-green-950">
            Edit Tour Package
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-green-950">Package Name:</label>
                <input
                  type="text"
                  name="package_name"
                  value={formData.package_name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
              <div>
                <label className="block mb-2 text-green-950">Package Price:</label>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faMoneyBillWave}
                    className="absolute left-3 top-3 text-gray-500"
                  />
                  <input
                    type="number"
                    name="package_price"
                    value={formData.package_price}
                    onChange={handleChange}
                    required
                    className="w-full p-3 pl-10 border border-gray-300 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>
              </div>
              <div>
                <label className="block mb-2 text-green-950">Total Space:</label>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faUsers}
                    className="absolute left-3 top-3 text-gray-500"
                  />
                  <input
                    type="number"
                    name="total_space"
                    value={formData.total_space}
                    onChange={handleChange}
                    required
                    className="w-full p-3 pl-10 border border-gray-300 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block mb-2 text-green-950">
                  Package Description:
                </label>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faInfoCircle}
                    className="absolute left-3 top-3 text-gray-500"
                  />
                  <textarea
                    name="package_description"
                    value={formData.package_description}
                    onChange={handleChange}
                    required
                    className="w-full p-3 pl-10 border border-gray-300 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-gold"
                  ></textarea>
                </div>
              </div>
              <div className="col-span-1">
                <label className="block mb-2 text-green-950">Image 1:</label>
                <div className="relative flex items-center">
                  <input
                    type="file"
                    name="image1"
                    onChange={handleFileChange}
                    className="hidden"
                    id="image1"
                  />
                  <label
                    htmlFor="image1"
                    className="w-full cursor-pointer p-3 border border-gray-300 rounded bg-white text-black flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-gold"
                  >
                    <FontAwesomeIcon icon={faFileUpload} className="mr-2" />
                    Upload Image 1
                  </label>
                </div>
              </div>
              <div className="col-span-1">
                <label className="block mb-2 text-green-950">Image 2:</label>
                <div className="relative flex items-center">
                  <input
                    type="file"
                    name="image2"
                    onChange={handleFileChange}
                    className="hidden"
                    id="image2"
                  />
                  <label
                    htmlFor="image2"
                    className="w-full cursor-pointer p-3 border border-gray-300 rounded bg-white text-black flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-gold"
                  >
                    <FontAwesomeIcon icon={faFileUpload} className="mr-2" />
                    Upload Image 2
                  </label>
                </div>
              </div>
              <div className="col-span-1">
                <label className="block mb-2 text-green-950">Image 3:</label>
                <div className="relative flex items-center">
                  <input
                    type="file"
                    name="image3"
                    onChange={handleFileChange}
                    className="hidden"
                    id="image3"
                  />
                  <label
                    htmlFor="image3"
                    className="w-full cursor-pointer p-3 border border-gray-300 rounded bg-white text-black flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-gold"
                  >
                    <FontAwesomeIcon icon={faFileUpload} className="mr-2" />
                    Upload Image 3
                  </label>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 mt-6 bg-gold text-green-900 font-bold rounded hover:bg-gold-700 flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faSave} className="mr-2" />
              Update Tour Package
            </button>
          </form>
        </div>
        <div className="md:w-1/3 mt-10 md:mt-0">
          <h2 className="text-3xl font-bold mb-6 text-center text-green-950">
            Preview Images
          </h2>
          <div className="grid grid-cols-1 gap-6">
            {previewImages.image1 && (
              <div className="w-full h-48 border border-gray-300 rounded bg-white flex items-center justify-center">
                <img
                  src={previewImages.image1}
                  alt="Image 1 Preview"
                  className="object-contain h-full"
                />
              </div>
            )}
            {previewImages.image2 && (
              <div className="w-full h-48 border border-gray-300 rounded bg-white flex items-center justify-center">
                <img
                  src={previewImages.image2}
                  alt="Image 2 Preview"
                  className="object-contain h-full"
                />
              </div>
            )}
            {previewImages.image3 && (
              <div className="w-full h-48 border border-gray-300 rounded bg-white flex items-center justify-center">
                <img
                  src={previewImages.image3}
                  alt="Image 3 Preview"
                  className="object-contain h-full"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default TGTourEdit;
