import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Nav from "../../components/Nav";
import useRedirectLogoutUsers from "../../hooks/redirectLogoutUsers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";

const HRoomEdit = () => {
  useRedirectLogoutUsers("/login");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [roomName, setRoomName] = useState("");
  const [roomPrice, setRoomPrice] = useState("");
  const [roomAmount, setRoomAmount] = useState("");
  const [roomDescription, setRoomDescription] = useState("");
  const [roomImages, setRoomImages] = useState([null, null, null]);
  const [currentImages, setCurrentImages] = useState([null, null, null]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/rooms/get-single/${id}`,
          {
            withCredentials: true,
          }
        );
        const room = response.data;
        setRoomName(room.room_name);
        setRoomPrice(room.room_price);
        setRoomAmount(room.room_amount);
        setRoomDescription(room.room_description);
        setCurrentImages(room.room_image);
      } catch (error) {
        toast.error("Error fetching room details: " + error.message);
      }
    };
    fetchRoom();
  }, [id]);

  const handleImageChange = (index, event) => {
    const files = [...roomImages];
    const previews = [...currentImages];
    files[index] = event.target.files[0];
    previews[index] = URL.createObjectURL(event.target.files[0]);
    setRoomImages(files);
    setCurrentImages(previews);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("room_name", roomName);
    formData.append("room_price", roomPrice);
    formData.append("room_amount", roomAmount);
    formData.append("room_description", roomDescription);
    roomImages.forEach((image, index) => {
      if (image) {
        formData.append(`image${index + 1}`, image);
      }
    });

    try {
      const response = await axios.put(
        `${BACKEND_URL}/rooms/update/${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      setTimeout(() => {
        navigate("/hotel manager");
      }, 3000);
    } catch (error) {
      toast.error("Error updating room: " + error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    } finally {
      setLoading(false);
    }
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
      <div className="min-h-screen mt-20 bg-gray-100 text-gray-800 p-4 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Edit Room
        </h1>
        <div className="bg-white text-gray-900 rounded-lg shadow-lg shadow-gray-400 p-6 w-full max-w-4xl flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
          <form onSubmit={handleSubmit} className="w-full lg:w-1/2 space-y-6">
            <div>
              <label
                className="block text-lg font-semibold mb-2"
                htmlFor="roomName"
              >
                Room Name
              </label>
              <input
                type="text"
                id="roomName"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex space-x-4">
              <div className="flex-1">
                <label
                  className="block text-lg font-semibold mb-2"
                  htmlFor="roomPrice"
                >
                  Room Price
                </label>
                <input
                  type="number"
                  id="roomPrice"
                  value={roomPrice}
                  onChange={(e) => setRoomPrice(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex-1">
                <label
                  className="block text-lg font-semibold mb-2"
                  htmlFor="roomAmount"
                >
                  Room Amount
                </label>
                <input
                  type="number"
                  id="roomAmount"
                  value={roomAmount}
                  onChange={(e) => setRoomAmount(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <div>
              <label
                className="block text-lg font-semibold mb-2"
                htmlFor="roomDescription"
              >
                Room Description
              </label>
              <textarea
                id="roomDescription"
                value={roomDescription}
                onChange={(e) => setRoomDescription(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>
            <div>
              <label className="block text-lg font-semibold mb-2">
                Room Images
              </label>
              {roomImages.map((_, index) => (
                <div key={index} className="mb-4">
                  <input
                    type="file"
                    id={`file-input-${index}`}
                    className="hidden"
                    onChange={(event) => handleImageChange(index, event)}
                    accept="image/*"
                  />
                  <label
                    htmlFor={`file-input-${index}`}
                    className="w-full bg-white px-4 py-2 rounded-md border-green-950 border-2 cursor-pointer hover:bg-green-950 hover:text-white transition-colors flex items-center justify-center space-x-2"
                  >
                    <FontAwesomeIcon icon={faCamera} />
                    <span>
                      {roomImages[index]
                        ? roomImages[index].name
                        : `Choose Image ${index + 1}`}
                    </span>
                  </label>
                </div>
              ))}
            </div>
            <button
              type="submit"
              className={`w-full bg-green-950 text-white px-4 py-2 rounded hover:bg-green-800 transition-colors flex items-center justify-center space-x-2 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              <FontAwesomeIcon icon={faCheckCircle} />
              <span>{loading ? "Updating..." : "Update Room"}</span>
            </button>
          </form>
          <div className="w-full lg:w-1/2 flex flex-col space-y-4">
            {currentImages.map((img, index) => (
              <div key={index} className="flex-1">
                {img && (
                  <img
                    src={img}
                    alt={`Room Image ${index + 1}`}
                    className="w-full h-32 object-cover rounded transition-all duration-300 hover:scale-105"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HRoomEdit;
