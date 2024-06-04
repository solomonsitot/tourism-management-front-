import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faDollarSign,
  faBed,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import useRedirectLogoutUsers from "../../hooks/redirectLogoutUsers";
import ReactStars from "react-rating-stars-component";

function THotelDetail() {
  useRedirectLogoutUsers("/login");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [hotelObj, setHotelObj] = useState({});
  const [rooms, setHotelRooms] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function fetchHotel() {
      const result = await axios.get(
        `${BACKEND_URL}/user/get-single-provider/${id}`
      );
      setHotelObj(result.data);
    }
    fetchHotel();

    async function fetchRooms() {
      const result = await axios.get(
        `${BACKEND_URL}/rooms/get-all-rooms/${id}`
      );
      setHotelRooms(result.data);
    }
    fetchRooms();
  }, [id]);

  const handleRatingChange = async (newRating, roomId) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/rooms/rate-room/${roomId}`,
        {
          rate: newRating,
        },
        { withCredentials: true }
      );
      window.location.reload();
    } catch (error) {
      console.error("Failed to submit rating", error);
    }
  };

  return (
    <div className="p-3 mt-20 h-screen overflow-y-scroll bg-gray-100">
      <div className="w-11/12 mx-auto bg-white p-5 rounded shadow">
        <h1 className="font-bold text-3xl pt-3">
          {hotelObj.company_name} / {hotelObj.address}
        </h1>
        <div className="flex items-center pt-3">
          <FontAwesomeIcon
            icon={faMapMarkerAlt}
            className="text-gray-500 mr-2"
          />
          <p className="text-[#6E6C6C]">{hotelObj.address}</p>
        </div>
      </div>
      <div className="w-11/12 mx-auto bg-white p-5 mt-5 rounded shadow">
        <h1 className="text-3xl font-semibold py-3">Overview</h1>
        <p>{hotelObj.description}</p>
      </div>
      {rooms.map((room, index) => (
        <div
          key={index}
          className="w-11/12 mx-auto bg-white p-5 mt-5 rounded shadow"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid grid-cols-2 gap-2">
              {room.room_image.slice(0, 2).map((image, imgIndex) => (
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
                src={room.room_image[0]}
                alt={`Room ${index} Main Image`}
                className="object-cover w-full h-64 rounded"
              />
            </div>
          </div>
          <div className="mt-4">
            <h1 className="font-bold text-xl">{room.room_name}</h1>
            <p className="mt-2">{room.room_description}</p>
            <div className="flex justify-between items-center mt-4">
              <div>
                <div className="flex items-center mt-2">
                  <ReactStars
                    isHalf={true}
                    value={room.room_rate.value}
                    count={5}
                    onChange={(newRating) =>
                      handleRatingChange(newRating, room._id)
                    }
                    size={24}
                    activeColor="#ffd700"
                  />
                  <div className="ml-2 flex items-center">
                    <FontAwesomeIcon icon={faUsers} className="text-gray-500 mr-1" />
                    <p>{room.room_rate.rater_number}</p>
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <FontAwesomeIcon
                    icon={faDollarSign}
                    className="text-gray-500 mr-2"
                  />
                  <p className="text-lg">{room.room_price} $ per night</p>
                </div>
                <div className="flex items-center mt-2">
                  <FontAwesomeIcon
                    icon={faBed}
                    className="text-gray-500 mr-2"
                  />
                  <p>{room.room_available} rooms available</p>
                </div>
              </div>
              <button
                onClick={() => navigate(`reserve/${room._id}`)}
                className="bg-green-900 px-4 py-2 text-white rounded-lg"
              >
                Reserve now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default THotelDetail;
