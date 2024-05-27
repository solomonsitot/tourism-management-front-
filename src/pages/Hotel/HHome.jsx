import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Nav from "../../components/Nav";
import useRedirectLogoutUsers from "../../hooks/redirectLogoutUsers";

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
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-green-950 text-white rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-white">My Rooms</h2>
        <div className="space-y-6">
          {rooms.length > 0 ? (
            rooms.map((room) => (
              <div
                key={room._id}
                className="bg-white text-black p-4 rounded-md shadow-md"
              >
                {room.room_image && room.room_image.length > 0 && (
                  <img
                    src={room.room_image[0]} // Display the first image
                    alt={room.room_name}
                    className="w-full h-64 object-cover rounded-md mb-4"
                  />
                )}
                <h3 className="text-xl font-bold">{room.room_name}</h3>
                <p>{room.room_description}</p>
                <p>Price: ${room.room_price}</p>
                <p>Available: {room.room_available}</p>
                <button
                  onClick={() => handleEdit(room._id)}
                  className="mr-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(room._id)}
                  className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
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
