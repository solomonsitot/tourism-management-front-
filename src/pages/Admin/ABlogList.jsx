import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav";
import useRedirectLogoutUsers from "../../hooks/redirectLogoutUsers";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ABlogList() {
  useRedirectLogoutUsers("/login");
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/blogs/get-all`, {
          withCredentials: true,
        });
        console.log(response.data);
        setBlogs(response.data);
      } catch (error) {
        toast.error("Error fetching blogs");
      }
    };

    fetchBlogs();
  }, [BACKEND_URL]);
  const deleteItem = async (id, successMessage) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        await axios.delete(`${BACKEND_URL}/blogs/delete/${id}`, { withCredentials: true });
        toast.success(successMessage);
        setTimeout(() => window.location.reload(), 3000);
      } catch (error) {
        toast.error("An error occurred while deleting.");
      }
    }
  };
  return (
    <div className="bg-gray-900 text-white h-screen overflow-y-scroll">
      {" "}
      <Nav
        href0="/admin"
        link1="All Destinations"
        href1="/admin/add-destination"
        link2="All Blogs"
        href2="/admin/add-blog"
      />
      <div className="pt-24 overflow-y-scroll h-screen flex flex-col p-4">
        <h1 className="text-center font-bold my-5 text-4xl text-green-400">
          All Blogs
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-[97%] mx-auto">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="bg-gray-800 text-white pb-2 rounded-lg overflow-hidden shadow-md shadow-gray-600 relative transition transform hover:scale-105"
            >
              <img
                className="h-[300px] w-full object-cover"
                src={blog.blog_image}
                alt={blog.blog_title}
              />
              <div className="p-4">
                <p className="font-bold border-l-4 my-1 text-xl px-3 py-1 border-l-green-400">
                  {blog.blog_title}
                </p>
                <p className="my-1 text-gray-300 h-28 overflow-y-scroll">
                  {blog.blog_description}
                </p>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex my-5 space-x-2">
                    <button
                      className="text-sm text-red-400 bg-red-900 px-3 py-1 rounded-lg"
                      onClick={() =>
                        deleteItem(
                          blog._id,
                          "Blog deleted successfully."
                        )
                      }
                    >
                      Delete
                    </button>
                    <button
                      className="text-sm text-green-400 bg-green-900 px-3 py-1 rounded-lg"
                      onClick={() => navigate(`/admin/blogs/edit/${blog._id}`)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ABlogList;
