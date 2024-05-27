import axios from "axios";
import React, { useEffect, useState } from "react";
import springs from "../../assets/40 Spring.jpg";

function HotelModal(props) {
  const [hotelObj, setHotelObj] = useState([]);

  const id = props.id;
  useEffect(() => {
    async function fetchHotel() {
      const result = await axios.get(
        `http://localhost:8000/user/get-single-user/${id}`
      );
      setHotelObj(result.data);
      //   console.log(result.data);
    }
    fetchHotel();
  }, []);
  return (
    <div className=" h-screen overflow-y-scroll">
      <div className=" fixed inset-0 bg-gray-200 backdrop-blur-sm  justify-between   z-50 ">
        <div className="flex justify-between">
          {props.id}
          <button onClick={props.onClose}>close</button>
        </div>

        <div>
          <h1 className="font-bold text-4xl">{hotelObj.name}</h1>
          <div className="flex justify-between">
            <div>
              <p>{hotelObj.address}</p>
              <p>{hotelObj.email}</p>
            </div>
            <button className="bg-green-950 text-white px-3 py-1 rounded-lg">
              Reserve Now
            </button>
          </div>
          <img src={springs} alt="" />
          <p>{hotelObj.description}</p>
        </div>
      </div>
    </div>
  );
}

export default HotelModal;
