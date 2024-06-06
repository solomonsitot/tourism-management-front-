import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import plane from "../../assets/Plane.png";
import zebra from "../../assets/Zebra.png";
import crocodile from "../../assets/crocodile.png";
import search from "../../assets/search.png";
import Nav from "../../components/Nav";
import axios from "axios";

function Home() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [key, setKey] = useState("");
  const [objects, setObjects] = useState([]);

  useEffect(() => {
    async function searchDestination() {
      const response = await axios.get(
        `${BACKEND_URL}/destinations/search/${key}`
      );
      setObjects(response.data);
      if (key === "") {
        setObjects([]);
      }
    }
    searchDestination();
  }, [key]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Nav />
      <header className="relative text-center mt-32 p-6">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/path-to-your-background-image.jpg')",
          }}
        ></div>
        <div className="relative z-10">
          <h1 className="text-6xl font-bold text-white animate-fade-in-down">
            Welcome to TripMate
          </h1>
          <p className="text-2xl mt-4 text-white animate-fade-in-up">
            Your ultimate adventure partner
          </p>
          <Link to="/signup">
            <button className="mt-8 px-6 py-3 bg-green-950 text-white text-xl rounded-xl shadow-lg animate-bounce">
              Get Started
            </button>
          </Link>
        </div>
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </header>
      <div className="flex justify-center mt-16">
        <div className="flex items-center w-full max-w-xl border rounded-full overflow-hidden bg-white shadow-lg">
          <input
            className="border-none p-3 flex-grow text-green-950 focus:outline-none"
            placeholder="Search destinations..."
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
      <div className="flex flex-wrap mt-12 px-5">
        {objects.map((obj, index) => (
          <div className="w-full sm:w-1/2 lg:w-1/3 p-4" key={index}>
            <div className="overflow-hidden rounded-xl shadow-xl transform transition-transform hover:scale-105">
              <img
                className="w-full h-48 object-cover"
                src={obj.dest_image}
                alt={obj.dest_name}
              />
              <div className="p-4">
                <h3 className="font-bold text-lg">{obj.dest_name}</h3>
                <p className="h-28 overflow-y-scroll text-gray-600">
                  {obj.dest_description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <section className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
        <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg animate-fade-in">
          <img
            src={plane}
            alt="Plane"
            className="h-40 w-40 mb-4 float-animation"
          />
          <h2 className="text-3xl font-bold text-green-950">
            Travel the World
          </h2>
          <p className="text-green-700 mt-2">
            Experience the best destinations.
          </p>
        </div>
        <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg animate-fade-in">
          <img
            src={zebra}
            alt="Zebra"
            className="h-40 w-40 mb-4 float-animation"
          />
          <h2 className="text-3xl font-bold text-green-950">
            Wildlife Adventures
          </h2>
          <p className="text-green-700 mt-2">Get close to nature's wonders.</p>
        </div>
        <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg animate-fade-in">
          <img
            src={crocodile}
            alt="Crocodile"
            className="h-40 w-40 mb-4 float-animation"
          />
          <h2 className="text-3xl font-bold text-green-950">
            Exotic Experiences
          </h2>
          <p className="text-green-700 mt-2">
            Discover the unseen and unknown.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;
