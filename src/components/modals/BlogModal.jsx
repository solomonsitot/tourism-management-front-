import React, { useEffect, useState } from "react";
import axios from "axios";

function BlogModal(props) {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [blogObj, setBlogObject] = useState({});
  const id = props.id;

  useEffect(() => {
    async function fetchBlog() {
      const result = await axios.get(`${BACKEND_URL}/blogs/get-single/${id}`);
      setBlogObject(result.data);
    }
    fetchBlog();
  }, [id]);

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl w-11/12 lg:w-4/5 max-h-4/5 overflow-hidden transform transition-transform duration-300 ease-out scale-95 hover:scale-100">
        <div className="flex flex-col lg:flex-row h-full">
          <img
            className="w-full lg:w-1/2 h-72 lg:h-auto object-cover rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none"
            src={blogObj.blog_image}
            alt="Blog"
          />
          <div className="p-8 flex flex-col justify-between w-full lg:w-1/2">
            <div className="flex justify-between items-start">
              <p className="font-bold text-3xl text-green-900 border-l-4 border-green-950 pl-3">
                {blogObj.blog_title}
              </p>
              <button
                className="bg-red-600 text-white rounded-full px-5 py-2 ml-4"
                onClick={props.onClose}
              >
                ✕
              </button>
            </div>
            <div className="text-lg my-6 text-gray-700 max-h-64 overflow-y-auto">
              {blogObj.blog_description}
            </div>
            {/* <p className="text-sm text-gray-500">
              {new Date(blogObj.blog_date).toLocaleDateString()}
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogModal;
