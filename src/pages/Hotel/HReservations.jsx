import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../../components/Nav";
import useRedirectLogoutUsers from "../../hooks/redirectLogoutUsers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCalendar,
  faBed,
  faCheck,
  faTimes,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

function HReservations() {
  useRedirectLogoutUsers("/login");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    async function fetchReservations() {
      try {
        const result = await axios.get(
          `${BACKEND_URL}/reservation/get-my-reservation`,
          { withCredentials: true }
        );
        setReservations(result.data);
        console.log("Fetched reservations:", result.data);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    }
    fetchReservations();
  }, [BACKEND_URL]);

  return (
    <>
      <Nav
        href0="/hotel manager"
        link1="Add Room"
        href1="/hotel manager/add-room"
        link2="Reservation"
        href2="/hotel manager/see-reservation"
      />
      <div className="min-h-screen mt-20 bg-gray-100 text-gray-900 p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Reservations
        </h1>
        {reservations.length === 0 ? (
          <p className="text-xl text-center">No reservations found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reservations.map((reservation) => (
              <div
                key={reservation._id}
                className="bg-white rounded-lg p-6 shadow-lg transition transform hover:scale-105"
              >
                <h2 className="text-2xl font-bold mb-4 text-blue-600">
                  {reservation.room.room_name}
                </h2>

                <p className="text-lg mb-2 flex items-center">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="mr-2 text-green-950"
                  />
                  <span className="font-semibold">Email:</span>{" "}
                  {reservation.customer.email}
                </p>
                <p className="text-lg mb-2 flex items-center">
                  <FontAwesomeIcon
                    icon={faCalendar}
                    className="mr-2 text-green-950"
                  />
                  <span className="font-semibold">From:</span>{" "}
                  {new Date(reservation.from).toLocaleDateString()}
                </p>
                <p className="text-lg mb-2 flex items-center">
                  <FontAwesomeIcon
                    icon={faCalendar}
                    className="mr-2 text-green-950"
                  />
                  <span className="font-semibold">To:</span>{" "}
                  {new Date(reservation.to).toLocaleDateString()}
                </p>
                <p className="text-lg mb-2 flex items-center">
                  <FontAwesomeIcon
                    icon={faBed}
                    className="mr-2 text-green-950"
                  />
                  <span className="font-semibold">Quantity:</span>{" "}
                  {reservation.quantity}
                </p>
                <p className="text-lg mb-2 flex items-center">
                  <FontAwesomeIcon
                    icon={
                      reservation.status === "completed" ? faCheck : faTimes
                    }
                    className={`mr-2 ${
                      reservation.status === "completed"
                        ? "text-green-500 "
                        : "text-red-500"
                    }`}
                  />
                  <span className="font-semibold">Status :</span>{" "}
                  <span
                    className={`px-2 py-1 rounded-md ${
                      reservation.status === "completed"
                        ? "bg-green-100 text-green-800 px-3 ml-2"
                        : "bg-red-100 text-red-800 px-3 ml-2"
                    }`}
                  >
                    {reservation.status}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default HReservations;
