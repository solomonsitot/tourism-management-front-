import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../../components/Nav";
import useRedirectLogoutUsers from "../../hooks/redirectLogoutUsers";

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
      <div className="min-h-screen mt-20 bg-green-950 text-white p-8">
        <h1 className="text-4xl font-bold text-center mb-8">Reservations</h1>
        {reservations.length === 0 ? (
          <p className="text-xl text-center">No reservations found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reservations.map((reservation) => (
              <div
                key={reservation._id} // Assuming '_id' is a unique identifier
                className="bg-green-900 rounded-lg p-6 shadow-lg"
              >
                <h2 className="text-xl font-bold mb-4">
                  {reservation.room.room_name}
                </h2>{" "}
                {/* Assuming room has a 'name' field */}
                <p className="text-lg mb-2">
                  <span className="font-semibold">Customer:</span>{" "}
                  {reservation.customer.full_name}{" "}
                  {/* Assuming customer has a 'name' field */}
                </p>
                <p className="text-lg mb-2">
                  <span className="font-semibold">From:</span>{" "}
                  {new Date(reservation.from).toLocaleDateString()}
                </p>
                <p className="text-lg mb-2">
                  <span className="font-semibold">To:</span>{" "}
                  {new Date(reservation.to).toLocaleDateString()}
                </p>
                <p className="text-lg mb-2">
                  <span className="font-semibold">Quantity:</span>{" "}
                  {reservation.quantity}
                </p>
                <p className="text-lg mb-2">
                  <span className="font-semibold">Status:</span>{" "}
                  <span
                    className={`px-2 py-1 rounded-full ${
                      reservation.status === "Confirmed"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
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
