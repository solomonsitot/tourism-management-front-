import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav";
import menu from "../../assets/menu.png";
import hotelImage from "../../assets/hotel.png";
import locationIcon from "../../assets/location.png";
import contact from "../../assets/Contact.png";
import searchIcon from "../../assets/search.png";
import commentIcon from "../../assets/comment.png";
import starIcon from "../../assets/star.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useRedirectLogoutUsers from "../../hooks/redirectLogoutUsers";

function THotels() {
  useRedirectLogoutUsers("/login");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [stat, setStatus] = useState(true);
  const [hotels, setHotels] = useState([]);
  const [key, setKey] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(
        `${BACKEND_URL}/user/search-hotel/${key}`
      );
      setHotels(result.data);
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
        <h1 className="text-center text-4xl font-semibold">All Hotels</h1>
        <div className="flex h-14 justify-center mt-7">
          <img
            className="h-full pl-8 pr-2 self-center p-3 border-solid border-2 border-r-0 rounded-r-none border-green-950 rounded-2xl"
            src={searchIcon}
            alt="Search"
          />
          <input
            className="w-2/3 h-full self-center p-3 border-solid border-2 border-l-0 rounded-l-none border-green-950 rounded-2xl focus:outline-none"
            type="text"
            placeholder="Search for hotels..."
            onChange={(e) => {
              setKey(e.target.value);
            }}
          />
        </div>
      </div>
      {hotels.map((hotel, index) => (
        <div key={index} className="my-4 w-11/12 mx-auto">
          <div className="block lg:flex gap-8 w-full lg:w-9/12 mx-auto py-10">
            <img
              className="w-11/12 mx-auto lg:w-2/5 rounded-xl py-5"
              src={hotel.profile_image}
              alt="Hotel"
            />
            <div className="w-5/6 mx-auto lg:w-3/5 rounded-xl">
              <h1 className="font-bold text-green-950 text-3xl m-2">
                {hotel.company_name}
              </h1>
              <div className="flex items-center">
                <img className="p-2" src={locationIcon} alt="Location" />
                <p className="text-green-700">{hotel.address}</p>
              </div>
              <div className="my-3 flex items-center">
                <img className="mr-3" src={commentIcon} alt="Comment" />
                <p>{hotel.description}</p>
              </div>
              <p className="text-gray-700 font-bold mb-2">Great For</p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-green-900 p-2 flex rounded-lg items-center">
                  <img className="h-5 mr-2" src={starIcon} alt="Star" />
                  <p>Entertainment</p>
                </div>
                <div className="bg-green-900 p-2 flex rounded-lg items-center">
                  <img className="h-5 mr-2" src={starIcon} alt="Star" />
                  <p>Sport</p>
                </div>
                <div className="bg-green-900 p-2 flex rounded-lg items-center">
                  <img className="h-5 mr-2" src={starIcon} alt="Star" />
                  <p>Activity</p>
                </div>
              </div>
              <button
                onClick={() => {
                  navigate(`detail/${hotel._id}`);
                }}
                className="bg-green-900 px-2 py-1 text-white mt-6 rounded-lg"
              >
                See Rooms {">>"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default THotels;
