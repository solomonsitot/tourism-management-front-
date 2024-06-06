import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../../components/Nav";
import plane from "../../assets/Plane.png";
import weather from "../../assets/weather.png";
import ZebranZcroco from "../../assets/bek3.jpg";
import search from "../../assets/search.png";
import hicking from "../../assets/hicking.png";
import culture from "../../assets/culture.png";
import nature from "../../assets/nature.png";
import religion from "../../assets/religion.png";
import lamp from "../../assets/lamp.png";
import bed from "../../assets/bed.png";
import guide from "../../assets/guide.png";
import shop from "../../assets/shop.png";
import menu from "../../assets/menu.png";
import telegram from "../../assets/telegram2.png";
import facebook from "../../assets/facebook.png";
import twitter from "../../assets/twitter.png";
import arrow from "../../assets/arrow.png";
import fourty from "../../assets/40 Spring.jpg";
import contact from "../../assets/Contact.png";
import { useNavigate, useParams } from "react-router-dom";
import useRedirectLogoutUsers from "../../hooks/redirectLogoutUsers";
import { useSelector } from "react-redux";
import { selectId, selectRole } from "../../redux/features/auth/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHiking,
  faCamera,
  faTree,
  faChurch,
  faBed,
  faShoppingCart,
  faMapSigns,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";
import {
  faTelegramPlane,
  faFacebook,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
function THome() {
  useRedirectLogoutUsers("/login");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [key, setKey] = useState("");
  const [stat, setStatus] = useState(false);
  const [objects, setObject] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function searchDestination() {
      const response = await axios.get(
        `${BACKEND_URL}/destinations/search/${key}`
      );
      setObject(response.data);
      if (key === "") {
        setObject([]);
      }
    }
    searchDestination();
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
        link5="Shops"
        href5="/tourist/see-shops"
      />

      <div className="relative">
        <img
          className="w-full h-96 object-cover"
          src={ZebranZcroco}
          alt="Zebra and Crocodile"
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-50">
          <div className="text-center text-white">
            <img className="h-16 inline" src={weather} alt="Weather" />
            <h1 className="text-4xl md:text-5xl lg:text-7xl leading-tight mt-4">
              Start Your <span className="block font-bold">Journey Enjoy</span>
            </h1>
            <div className="text-xl my-3">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>
            <div className="flex gap-4 mt-8 justify-center">
              <button className="bg-green-950 text-white font-bold px-6 py-2 rounded-full transition-transform transform hover:scale-105">
                Get Started
              </button>
              <div className="flex items-center border rounded-full overflow-hidden">
                <input
                  className="border-none p-3 text-green-950 focus:outline-none"
                  placeholder="Search..."
                  type="text"
                  onChange={(e) => {
                    setKey(e.target.value);
                  }}
                />
                <button className="p-3 bg-gray-200">
                  <img className="h-6" src={search} alt="Search" />
                </button>
              </div>
            </div>
          </div>
          <img
            className="h-20 md:h-24 absolute bottom-4 right-4"
            src={plane}
            alt="Plane"
          />
        </div>
      </div>

      <div className="flex flex-wrap mt-12 px-5">
        {objects.map((obj, index) => (
          <div className="w-full sm:w-1/2 lg:w-1/3 p-4" key={index}>
            <div className="overflow-hidden rounded-xl shadow-xl transform transition-transform hover:scale-105">
              <img
                className="w-full h-48 object-cover"
                src={obj.dest_image}
                alt="Destination"
              />
              <div className="p-4">
                <p className="font-bold">{obj.dest_name}</p>
                <p className="h-28 overflow-y-scroll">{obj.dest_description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="my-12 px-5">
        <h1 className="font-bold text-2xl text-center mb-6">
          What Excites You Most?
        </h1>
        <div className="flex flex-wrap justify-around">
          <div className="flex items-center gap-2 my-2 w-1/2 md:w-1/4">
            <img
              className="bg-green-950 rounded-full p-3 h-16 w-16"
              src={hicking}
              alt="Hicking"
            />
            <div>
              <h1 className="font-bold">Hicking</h1>
              <p className="text-sm">Lorem Ipsum is simply dummy text</p>
            </div>
          </div>
          <div className="flex items-center gap-2 my-2 w-1/2 md:w-1/4">
            <img
              className="bg-green-950 rounded-full p-3 h-16 w-16"
              src={culture}
              alt="Culture"
            />
            <div>
              <h1 className="font-bold">Culture</h1>
              <p className="text-sm">Lorem Ipsum is simply dummy text</p>
            </div>
          </div>
          <div className="flex items-center gap-2 my-2 w-1/2 md:w-1/4">
            <img
              className="bg-green-950 rounded-full p-3 h-16 w-16"
              src={nature}
              alt="Nature"
            />
            <div>
              <h1 className="font-bold">Nature</h1>
              <p className="text-sm">Lorem Ipsum is simply dummy text</p>
            </div>
          </div>
          <div className="flex items-center gap-2 my-2 w-1/2 md:w-1/4">
            <img
              className="bg-green-950 rounded-full p-3 h-16 w-16"
              src={religion}
              alt="Religion"
            />
            <div>
              <h1 className="font-bold">Religious</h1>
              <p className="text-sm">Lorem Ipsum is simply dummy text</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center my-16 px-5">
        <h1 className="text-green-800 font-semibold text-3xl my-6">
          Our Services
        </h1>
        <div className="flex flex-wrap justify-around">
          <div className="w-full md:w-1/5 text-center">
            <img className="mx-auto h-24 w-24" src={bed} alt="Hotels" />
            <h1 className="my-4 text-2xl font-bold">Hotels</h1>
            <p>Lorem Ipsum is simply dummy text of the printing.</p>
          </div>
          <div className="w-full md:w-1/5 text-center">
            <img className="mx-auto h-24 w-24" src={shop} alt="Shopping" />
            <h1 className="my-4 text-2xl font-bold">Shopping</h1>
            <p>Lorem Ipsum is simply dummy text of the printing.</p>
          </div>
          <div className="w-full md:w-1/5 text-center">
            <img className="mx-auto h-24 w-24" src={guide} alt="Tour Agents" />
            <h1 className="my-4 text-2xl font-bold">Tour Agents</h1>
            <p>Lorem Ipsum is simply dummy text of the printing.</p>
          </div>
          <div className="w-full md:w-1/5 text-center">
            <img className="mx-auto h-24 w-24" src={lamp} alt="Discovery" />
            <h1 className="my-4 text-2xl font-bold">Discovery</h1>
            <p>Lorem Ipsum is simply dummy text of the printing.</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-3 px-6 pb-5 mb-20">
        <div className="border-solid rounded-2xl border-2 w-full md:w-1/2 border-green-950 flex items-center justify-center h-64 mb-6 md:mb-0">
          <h1 className="text-5xl font-bold text-green-950">ADVERTISEMENT</h1>
        </div>
        <div className="flex flex-col w-full md:w-1/2 gap-3">
          <div className="flex flex-col md:flex-row gap-3">
            <div
              className="flex-1 cursor-pointer bg-[#C0F4FF] rounded-2xl p-6 text-3xl font-bold text-green-950"
              onClick={() => {
                navigate("see-blogs");
              }}
            >
              Read our Blogs
            </div>
            <div
              className="flex-1 cursor-pointer bg-[#E1FECE] rounded-2xl p-6 text-3xl font-bold text-green-950"
              onClick={() => {
                navigate("destinations");
              }}
            >
              Go to discovery
            </div>
          </div>
          <div className="bg-[#F2E8DE] rounded-2xl p-6 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-semibold text-green-950">
                Gamo tourism
              </h1>
              <img className="h-6" src={arrow} alt="Arrow" />
            </div>
            <div className="flex flex-col gap-3">
              <div className="bg-gray-200 rounded-2xl p-3 flex items-center gap-3">
                <FontAwesomeIcon
                  icon={faTelegramPlane}
                  className="text-green-950 text-2xl"
                />
                <p className="text-2xl font-semibold text-green-950">
                  Telegram
                </p>
              </div>
              <div className="bg-gray-200 rounded-2xl p-3 flex items-center gap-3">
                <FontAwesomeIcon
                  icon={faFacebook}
                  className="text-green-950 text-2xl"
                />
                <p className="text-2xl font-semibold text-green-950">
                  Facebook
                </p>
              </div>
              <div className="bg-gray-200 rounded-2xl p-3 flex items-center gap-3">
                <FontAwesomeIcon
                  icon={faTwitter}
                  className="text-green-950 text-2xl"
                />
                <p className="text-2xl font-semibold text-green-950">Twitter</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default THome;
