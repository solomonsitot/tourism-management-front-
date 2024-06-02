import React, { useState } from "react";
import axios from "axios";
import Nav from "../../components/Nav";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useRedirectLogoutUsers from "../../hooks/redirectLogoutUsers";

const HRoom = () => {
  useRedirectLogoutUsers("/login");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [roomName, setRoomName] = useState("");
  const [roomPrice, setRoomPrice] = useState("");
  const [roomAmount, setRoomAmount] = useState("");
  const [roomDescription, setRoomDescription] = useState("");
  const [roomImages, setRoomImages] = useState([null, null, null]);
  const [imagePreviews, setImagePreviews] = useState([null, null, null]);
  const navigate = useNavigate();

  const handleImageChange = (index, event) => {
    const files = [...roomImages];
    const previews = [...imagePreviews];
    files[index] = event.target.files[0];
    previews[index] = URL.createObjectURL(event.target.files[0]);
    setRoomImages(files);
    setImagePreviews(previews);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("room_name", roomName);
    formData.append("room_price", roomPrice);
    formData.append("room_amount", roomAmount);
    formData.append("room_description", roomDescription);
    roomImages.forEach((image, index) => {
      formData.append(`image${index + 1}`, image);
    });

    try {
      const response = await axios.post(
        `${BACKEND_URL}/rooms/create-new`,
        formData,
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast(response.data.message);
      setTimeout(() => {
        navigate("/hotel manager");
      }, 3000);
    } catch (error) {
      console.error("Error creating room:", error);
      toast.error("Error creating room: " + error.message);
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
          Create a New Room
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white text-gray-900 rounded-lg shadow-lg p-6 w-full max-w-lg space-y-6"
        >
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
              className="w-full px-3 py-2 border rounded"
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
                className="w-full px-3 py-2 border rounded"
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
                className="w-full px-3 py-2 border rounded"
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
              className="w-full px-3 py-2 border rounded"
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-lg font-semibold mb-2">
              Room Images
            </label>
            {[0, 1, 2].map((index) => (
              <div key={index} className="mb-4">
                <input
                  type="file"
                  id={`file-input-${index}`}
                  className="hidden"
                  onChange={(event) => handleImageChange(index, event)}
                  accept="image/*"
                  required
                />
                <label
                  htmlFor={`file-input-${index}`}
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700 transition-colors"
                >
                  {roomImages[index] ? roomImages[index].name : `Choose Image ${index + 1}`}
                </label>
                {imagePreviews[index] && (
                  <img
                    src={imagePreviews[index]}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-48 object-cover mt-2 rounded"
                  />
                )}
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800 transition-colors"
          >
            Create Room
          </button>
        </form>
      </div>
    </>
  );
};

export default HRoom;
