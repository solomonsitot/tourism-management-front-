import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faDollarSign,
  faChair,
} from "@fortawesome/free-solid-svg-icons"; // Updated icon
import Nav from "../../components/Nav";
import useRedirectLogoutUsers from "../../hooks/redirectLogoutUsers";

function TTourDetail() {
    useRedirectLogoutUsers("/login");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [tours, setTour] = useState({});
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function fetchHotel() {
      const result = await axios.get(
        `${BACKEND_URL}/user/get-single-hotel/${id}`
      );
      setTour(result.data);
    }
    fetchHotel();

    async function fetchRooms() {
      const result = await axios.get(
        `${BACKEND_URL}/tours/get-all-packages/${id}`
      );
      setPackages(result.data);
      console.log(result.data);
    }
    fetchRooms();
  }, [id]);

  return (
    <>
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
      <div className="p-3 h-screen overflow-y-scroll bg-gray-100">
        <div className="w-11/12 mx-auto bg-white p-5 rounded shadow">
          <h1 className="font-bold text-3xl pt-3">
            {tours.company_name} / {tours.address}
          </h1>
          <div className="flex items-center pt-3">
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              className="text-gray-500 mr-2"
            />
            <p className="text-[#6E6C6C]">{tours.address}</p>
          </div>
        </div>
        <div className="w-11/12 mx-auto bg-white p-5 mt-5 rounded shadow">
          <h1 className="text-3xl font-semibold py-3">Overview</h1>
          <p>{tours.description}</p>
        </div>
        {packages.map((pack, index) => (
          <div
            key={index}
            className="w-11/12 mx-auto bg-white p-5 mt-5 rounded shadow"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div className="grid grid-cols-2 gap-2">
                {pack.image.slice(0, 2).map((image, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={image}
                    alt={`Room ${index} Image ${imgIndex}`}
                    className="object-cover rounded"
                  />
                ))}
              </div>
              <div>
                <img
                  src={pack.image[0]}
                  alt={`Room ${index} Main Image`}
                  className="object-cover w-full h-64 rounded"
                />
              </div>
            </div>
            <div className="mt-4">
              <h1 className="font-bold text-xl">{pack.package_name}</h1>
              <p className="mt-2">{pack.package_description}</p>
              <div className="flex justify-between items-center mt-4">
                <div>
                  <div className="flex items-center">
                    <FontAwesomeIcon
                      icon={faDollarSign}
                      className="text-gray-500 mr-2"
                    />
                    <p className="text-lg">{pack.package_price} $ per single person</p>
                  </div>
                  <div className="flex items-center mt-2">
                    <FontAwesomeIcon
                      icon={faChair} // Updated icon
                      className="text-gray-500 mr-2"
                    />
                    <p>{pack.space_left} seat available</p>
                  </div>
                </div>
                <button
                  onClick={() => navigate(`subscribe/${pack._id}`)}
                  className="bg-green-900 px-4 py-2 text-white rounded-lg"
                >
                  Subscribe now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default TTourDetail;
