import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../../components/Nav";
import BlogModal from "../../components/modals/BlogModal";
import springs from "../../assets/40 Spring.jpg";
import search from "../../assets/search.png";
import menu from "../../assets/menu.png";
import setting from "../../assets/setting.png";
import contact from "../../assets/Contact.png";
import useRedirectLogoutUsers from "../../hooks/redirectLogoutUsers";
function TBlogs() {
  useRedirectLogoutUsers("/login");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [blogObj, setBlogObject] = useState([]);
  const [stat, setStatus] = useState(true);
  const [key, setKey] = useState("");
  const [modal, setModal] = useState(false);
  const [Bid, setBid] = useState("");

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(
        `${BACKEND_URL}/blogs/search/${key}`
      );
      setBlogObject(result.data);
    }
    fetchData();
  }, [key]);
  return (
    <div>
      <Nav
        href0="/tourist"
        link1="Discover"
        href1="/tourist/destinations"
        link2="Blogs"
        href2="/tourist/see-blogs"
        link3="Hotels"
        href3="/tourist/see-hotels"
        link4="Tours"
        href4="/tourist/tours"
        // setting={contact}
        // menu={menu}
        // stat={stat}
      />
      <div className="w-full text-center">
        <h1 className="text-center text-4xl font-semibold">All Posts</h1>
        <div className="flex h-14 justify-center  mt-7">
          <img
            className="h-full pl-8 pr-2 self-center p-3 border-solid border-2 border-r-0 rounded-r-none border-green-950 rounded-2xl"
            src={search}
            alt=""
          />
          <input
            className="w-2/3 h-full self-center p-3 border-solid border-2 border-l-0 rounded-l-none border-green-950 rounded-2xl focus:outline-none"
            type="text"
            placeholder="search for articles . . . "
            onChange={(e) => {
              setKey(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="flex flex-wrap  ">
        {blogObj.map((blog, index) => {
          return (
            <div key={index} className="flex-grow w-full lg:w-1/2 p-6 overflow-hidden rounded-xl shadow-xl text-center transform transition-transform hover:scale-105">
              <img src={blog.blog_image} alt="" />
              <p className="font-bold border-l-4 my-1 text-xl px-3 py-1 border-l-green-950">
                {blog.blog_title}
              </p>
              <p className="h-28 overflow-y-scroll my-1 px-4 py-1 text-xl">{blog.blog_description}</p>

              <div className="flex justify-between px-4">
                <p className="my-1 py-1 text-gray-500 text-sm">
                  {blog.blog_date}
                </p>
                <button
                  className="text-sm text-green-950"
                  onClick={() => {
                    setModal(true);
                    setBid(blog._id);
                  }}
                >
                  Read
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {modal && (
        <BlogModal
          id={Bid}
          onClose={() => {
            setModal(false);
          }}
        />
      )}
    </div>
  );
}

export default TBlogs;

