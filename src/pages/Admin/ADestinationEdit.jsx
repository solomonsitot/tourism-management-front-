import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useRedirectLogoutUsers from "../../hooks/redirectLogoutUsers";
import Nav from "../../components/Nav";

function ADestinationEdit() {
  useRedirectLogoutUsers("/login");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // State to store image preview

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDest() {
      try {
        const result = await axios.get(
          `${BACKEND_URL}/destinations/get-single/${id}`
        );
        setTitle(result.data.dest_name);
        setDescription(result.data.dest_description);
        setLat(result.data.dest_location.lat);
        setLng(result.data.dest_location.lng);
        setImagePreview(result.data.dest_image);
      } catch (error) {
        console.error("Error fetching destination data:", error);
        toast("Failed to fetch destination data.");
      }
    }
    fetchDest();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("dest_name", title);
    formData.append("lat", lat); // Add latitude
    formData.append("lng", lng);
    formData.append("dest_description", description);
    if (image) {
      formData.append("dest_image", image);
    }

    try {
      const result = await axios.put(
        `${BACKEND_URL}/destinations/update/${id}`,
        formData,
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(result);
      toast(result.data.message);
      setTimeout(() => {
        navigate("/admin");
      }, 3000);
    } catch (error) {
      console.error(
        "Error uploading destination:",
        error.response ? error.response.data : error
      );
      toast("Failed to update destination. Please try again.");
    }
  };

  // Function to handle file input change and display image preview
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-green-950">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-3xl font-bold mb-4 text-green-950">
            Edit Destination
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-green-950 text-sm font-bold mb-2"
                htmlFor="dest_name"
              >
                Destination Name
              </label>
              <input
                type="text"
                id="dest_name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter destination name"
                required
              />
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
            <div className="mb-4">
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
            <div className="mb-4">
              <label
                className="block text-green-950 text-sm font-bold mb-2"
                htmlFor="dest_description"
              >
                Description/Details
              </label>
              <textarea
                id="dest_description"
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
                htmlFor="dest_image"
              >
                Destination Image
              </label>
              <input
                type="file"
                id="dest_image"
                onChange={handleImageChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                accept="image/*"
              />
            </div>
            {imagePreview && (
              <div className="mb-4">
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
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-yellow hover:bg-yellow-600 text-green-950 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Edit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ADestinationEdit;
