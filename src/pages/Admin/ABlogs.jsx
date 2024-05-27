import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useRedirectLogoutUsers from "../../hooks/redirectLogoutUsers";
import Nav from "../../components/Nav";

const ABlogs = () => {
  useRedirectLogoutUsers("/login");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
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
      console.log(result);
      toast(result.data.message);
      setTimeout(function () {
        navigate("/admin");
      }, 3000);
    } catch (error) {
      console.error("Error uploading blog:", error);
      toast("Failed to post blog. Please try again.");
    }
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
              <input
                type="file"
                id="image"
                onChange={(e) => setImage(e.target.files[0])}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                accept="image/*"
              />
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
      </div>
    </>
  );
};

export default ABlogs;
