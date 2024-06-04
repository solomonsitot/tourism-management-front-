import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useRedirectLogoutUsers from "../../hooks/redirectLogoutUsers";
import Nav from "../../components/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faImage } from "@fortawesome/free-solid-svg-icons";
import 'react-toastify/dist/ReactToastify.css';

const ABlogs = () => {
  useRedirectLogoutUsers("/login");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("blog_title", title);
    formData.append("blog_description", description);
    if (image) {
      formData.append("blog_image", image);
    }

    try {
      const result = await axios.post(
        `${BACKEND_URL}/blogs/post-new`,
        formData,
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(result.data.message);
      setTimeout(function () {
        navigate("/admin/all-blogs");
      }, 3000);
    } catch (error) {
      console.error("Error uploading blog:", error);
      toast.error("Failed to post blog. Please try again.");
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
      <div className="fixed w-full z-50">
        <Nav
          href0="/admin"
          link1="Destinations"
          href1="/admin/add-destination"
          link2="Blogs"
          href2="/admin/add-blog"
        />
      </div>
      <div className="overflow-y-scroll h-screen pt-20 flex items-center justify-center bg-white">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl flex">
          <div className="w-2/3 pr-8">
            <h1 className="text-3xl font-bold mb-4 text-green-950">
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Post a Blog
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-green-950 text-sm font-bold mb-2"
                  htmlFor="title"
                >
                  Blog Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter blog title"
                  required
                />
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
                  placeholder="Enter blog description"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label
                  className="block text-green-950 text-sm font-bold mb-2"
                  htmlFor="image"
                >
                  Blog Image
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
                  alt="Blog Preview"
                  className="w-full rounded"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ABlogs;
