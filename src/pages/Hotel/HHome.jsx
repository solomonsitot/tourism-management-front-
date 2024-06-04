import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Nav from "../../components/Nav";
import useRedirectLogoutUsers from "../../hooks/redirectLogoutUsers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const HHome = () => {
  useRedirectLogoutUsers("/login");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/rooms/get-my-rooms`, {
          withCredentials: true,
        });
        setRooms(response.data || []);
      } catch (error) {
        toast.error("Error fetching rooms: " + error.message);
      }
    };
    fetchRooms();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this room?"
    );
    if (!confirmDelete) {
      return; // Cancel deletion if user does not confirm
    }
    try {
      await axios.delete(`${BACKEND_URL}/rooms/delete/${id}`, {
        withCredentials: true,
      });
      setRooms(rooms.filter((room) => room._id !== id));
      toast.success("Room deleted successfully");
    } catch (error) {
      toast.error("Error deleting room: " + error.message);
    }
  };

  const handleEdit = (id) => {
    navigate(`/hotel manager/edit-room/${id}`);
  };

  return (
    <>
      <Nav
        href0="/hotel manager"
        link1="Add Room"
        href1="/hotel manager/add-room"
        link2="Reservation"
        href2="/hotel manager/see-reservation"
      />
      <div className="max-w-4xl mt-20 mx-auto p-6 bg-gray-100 text-gray-800 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">My Rooms</h2>
        <div className="space-y-6">
          {rooms.length > 0 ? (
            rooms.map((room) => (
              <div
                key={room._id}
                className="bg-white text-gray-900 p-4 rounded-md shadow-md transition-transform transform hover:scale-105"
              >
                {room.room_image && room.room_image.length > 0 && (
                  <div className="relative h-64 overflow-hidden rounded-md mb-4">
                    <img
                      src={room.room_image[0]} // Display the first image
                      alt={room.room_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2">{room.room_name}</h3>
                <p className="mb-2">{room.room_description}</p>
                <p className="font-semibold mb-2">Price: ${room.room_price}</p>
                <p className="font-semibold mb-4">Available: {room.room_available}</p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleEdit(room._id)}
                    className="py-2 px-4 bg-[#FFBB02] text-white rounded hover:bg-[#B46617] transition-colors flex items-center space-x-2"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(room._id)}
                    className="py-2 px-4 bg-red-700 text-white rounded hover:bg-red-900 transition-colors flex items-center space-x-2"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No rooms available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default HHome;
