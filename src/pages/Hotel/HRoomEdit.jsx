import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Nav from "../../components/Nav";
import useRedirectLogoutUsers from "../../hooks/redirectLogoutUsers";

const HRoomEdit = () => {
  useRedirectLogoutUsers("/login");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [roomName, setRoomName] = useState("");
  const [roomPrice, setRoomPrice] = useState("");
  const [roomAmount, setRoomAmount] = useState("");
  const [roomDescription, setRoomDescription] = useState("");
  const [roomImages, setRoomImages] = useState([null, null, null]);
  const [currentImages, setCurrentImages] = useState(["", "", ""]);
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
    files[index] = event.target.files[0];
    setRoomImages(files);

    const reader = new FileReader();
    reader.onload = (e) => {
      const newCurrentImages = [...currentImages];
      newCurrentImages[index] = e.target.result;
      setCurrentImages(newCurrentImages);
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

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
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(response.data.message);
      setTimeout(() => {
        navigate("/hotel manager");
      }, 3000);
    } catch (error) {
      toast.error("Error updating room: " + error.message);
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
        // link3="Hotels"
        // href3="/hotel manager/see-hotels"
        // link4="Tours"
        // href4="/hotel manager/tours"
        // setting={contact}
        // menu={menu}
        // stat={stat}
      />
      <div className="min-h-screen bg-green-950 text-white p-4 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-center text-golden mb-8">
          Edit Room
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white text-green-950 rounded-lg shadow-lg p-6 w-full max-w-lg space-y-6"
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
          <div>
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
          <div>
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
            {currentImages.map((img, index) => (
              <div key={index} className="mb-4">
                {img && (
                  <img
                    src={img}
                    alt={`Room Image ${index + 1}`}
                    className="mb-2 w-full h-32 object-cover rounded"
                  />
                )}
                <input
                  type="file"
                  onChange={(event) => handleImageChange(index, event)}
                  className="w-full px-3 py-2 border rounded"
                  accept="image/*"
                />
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-golden text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Update Room
          </button>
        </form>
      </div>
    </>
  );
};

export default HRoomEdit;
