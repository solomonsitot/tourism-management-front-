import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useRedirectLogoutUsers from "../../hooks/redirectLogoutUsers";
import Nav from "../../components/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faImage } from "@fortawesome/free-solid-svg-icons";
import 'react-toastify/dist/ReactToastify.css';

function ADestinations() {
  useRedirectLogoutUsers("/login");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("dest_name", title);
    formData.append("dest_description", description);
    formData.append("lat", lat);
    formData.append("lng", lng);
    if (image) {
      formData.append("dest_image", image);
    }
    try {
      const result = await axios.post(
        `${BACKEND_URL}/destinations/add`,
        formData,
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(result.data.message);
      setTimeout(() => {
        navigate("/admin");
      }, 3000);
    } catch (error) {
      console.error("Error uploading destination:", error);
      toast.error("Failed to post destination. Please try again.");
    }
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(selectedImage);
  };

  return (
    <>
      <Nav
        href0="/admin"
        link1="Destinations"
        href1="/admin/add-destination"
        link2="Blogs"
        href2="/admin/add-blog"
        link3="Users"
        href3="/admin/manage-user"
      />
      <div className="overflow-y-scroll h-screen pt-20 flex items-center justify-center bg-green-950">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl flex">
          <div className="w-2/3 pr-8">
            <h1 className="text-3xl font-bold mb-4 text-green-950">
              <FontAwesomeIcon icon={faGlobe} className="mr-2" />
              Add Destination
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-green-950 text-sm font-bold mb-2"
                  htmlFor="title"
                >
                  Destination Name
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter destination name"
                  required
                />
              </div>
              <div className="mb-4 flex">
                <div className="w-1/2 pr-2">
                  <label
                    className="block text-green-950 text-sm font-bold mb-2"
                    htmlFor="lat"
                  >
                    Latitude
                  </label>
                  <input
                    type="number"
                    id="lat"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter latitude"
                    required
                  />
                </div>
                <div className="w-1/2 pl-2">
                  <label
                    className="block text-green-950 text-sm font-bold mb-2"
                    htmlFor="lng"
                  >
                    Longitude
                  </label>
                  <input
                    type="number"
                    id="lng"
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter longitude"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label
                  className="block text-green-950 text-sm font-bold mb-2"
                  htmlFor="description"
                >
                  Description/Details
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter destination description"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label
                  className="block text-green-950 text-sm font-bold mb-2"
                  htmlFor="image"
                >
                  Destination Image
                </label>
                <div className="flex items-center">
                  <label
                    htmlFor="image"
                    className="cursor-pointer bg-yellow hover:bg-yellow-600 text-green-950 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                  >
                    <FontAwesomeIcon icon={faImage} className="mr-2" />
                    Choose Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    onChange={handleImageChange}
                    className="hidden"
                    accept="image/*"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-yellow hover:bg-yellow-600 text-green-950 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
          <div className="w-1/3 flex justify-center items-center">
            {imagePreview && (
              <div>
                <label className="block text-green-950 text-sm font-bold mb-2">
                  Image Preview
                </label>
                <img
                  src={imagePreview}
                  alt="Destination Preview"
                  className="w-full rounded"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ADestinations;
