import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../../components/Nav";
import plane from "../../assets/Plane.png";
import weather from "../../assets/weather.png";
import ZebranZcroco from "../../assets/zebra n croco.png";
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
import { useParams } from "react-router-dom";
import useRedirectLogoutUsers from "../../hooks/redirectLogoutUsers";
import { useSelector } from "react-redux";
import { selectId, selectRole } from "../../redux/features/auth/authSlice";

function THome() {
  useRedirectLogoutUsers("/login");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [key, setKey] = useState("");
  const [stat, setStatus] = useState(false);
  const [objects, setObject] = useState([]);

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
      />
      <div className="flex flex-col md:flex-row justify-between pt-14 px-5">
        <div className="md:w-1/2 lg:w-2/3">
          <img className="h-16" src={weather} alt="Weather" />
          <div className="flex items-center">
            <h1 className="text-4xl md:text-5xl lg:text-7xl leading-tight">
              Start Your <span className="block font-bold">Journey Enjoy</span>
            </h1>
            <img className="h-20 md:h-24 ml-4" src={plane} alt="Plane" />
          </div>
          <div className="text-xl my-3">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>
          <div className="flex gap-4 mt-8">
            <button className="bg-green-950 text-white font-bold px-6 py-2 rounded-full transition-transform transform hover:scale-105">
              Get Started
            </button>
            <div className="flex items-center border rounded-full overflow-hidden">
              <input
                className="border-none p-3 focus:outline-none"
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
        <div className="hidden md:flex md:w-1/2 lg:w-1/3 justify-center">
          <img
            className="h-full max-h-96"
            src={ZebranZcroco}
            alt="Zebra and Crocodile"
          />
        </div>
      </div>

      <div className="flex flex-wrap ">
  {objects.map((obj, index) => (
    <div
      className="flex-grow w-full lg:w-1/2 p-6 overflow-hidden rounded-xl shadow-xl text-center transform transition-transform hover:scale-105"
      key={index}
    >
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
  ))}
</div>


      <div className="flex flex-col md:flex-row my-9 py-6 bg-gray-100 px-5 mx-5 gap-16 shadow-2xl rounded-xl">
        <div className="w-full md:w-1/3">
          <h1 className="font-bold text-xl">What Excites You Most?</h1>
          <p className="text-sm">
            Lorem Ipsum is simply dummy text of the printing.
          </p>
        </div>
        <div className="flex flex-wrap justify-around gap-4 md:w-2/3">
          <div className="flex items-center gap-2 my-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
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
          <div className="flex items-center gap-2 my-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
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
          <div className="flex items-center gap-2 my-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
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
          <div className="flex items-center gap-2 my-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
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

      <div className="text-center my-16">
        <h1 className="text-green-800 font-semibold text-3xl my-6">
          Our Services
        </h1>
        <div className="flex flex-wrap justify-around gap-8">
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
            <div className="flex-1 bg-[#C0F4FF] rounded-2xl p-6 text-3xl font-bold text-green-950">
              Read our Blogs
            </div>
            <div className="flex-1 bg-[#E1FECE] rounded-2xl p-6 text-3xl font-bold text-green-950">
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
                <img src={telegram} alt="Telegram" />
                <p className="text-2xl font-semibold text-green-950">
                  Telegram
                </p>
              </div>
              <div className="bg-gray-200 rounded-2xl p-3 flex items-center gap-3">
                <img src={facebook} alt="Facebook" />
                <p className="text-2xl font-semibold text-green-950">
                  Facebook
                </p>
              </div>
              <div className="bg-gray-200 rounded-2xl p-3 flex items-center gap-3">
                <img src={twitter} alt="Twitter" />
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
