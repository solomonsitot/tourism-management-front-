import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faDollarSign,
  faUser,
  faUsers,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Nav from "../../components/Nav";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useRedirectLogoutUsers from "../../hooks/redirectLogoutUsers";

function TGHome() {
  useRedirectLogoutUsers("/login");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [tours, setTours] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTours() {
      try {
        const result = await axios.get(
          `${BACKEND_URL}/tours/get-my-tours`,
          {
            withCredentials: true,
          }
        );
        setTours(result.data.message);
      } catch (error) {
        toast.error("Error fetching tours: " + error.message);
      }
    }
    fetchTours();
  }, []);

  const deleteTour = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this tour package?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${BACKEND_URL}/tours/delete/${id}`, {
        withCredentials: true,
      });
      setTours(tours.filter((tour) => tour._id !== id));
      toast.success("Tour package deleted successfully");
    } catch (error) {
      toast.error("Error deleting tour: " + error.message);
    }
  };

  const editTour = (id) => {
    navigate(`/tour guide/edit-tour/${id}`);
  };

  return (
    <>
      <Nav
        href0="/tour guide"
        link1="Add Package"
        href1="/tour guide/add-tour"
        link2="Subscriptions"
        href2="/tour guide/see-subscriptions"
      />
      <div className="max-w-6xl mt-20 mx-auto p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-green-950">
          My Tour Packages
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tours.length > 0 ? (
            tours.map((tour) => (
              <div
                key={tour._id}
                className="text-green-950 bg-gray-100 p-4 rounded-md shadow-2xl shadow-black relative"
              >
                {tour.image && tour.image.length > 0 && (
                  <div className="mb-4">
                    <img
                      src={tour.image[0]}
                      alt={tour.package_name}
                      className="w-full h-48 object-cover rounded"
                    />
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2">{tour.package_name}</h3>
                <div className="mb-2 h-20 overflow-y-auto">
                  <FontAwesomeIcon icon={faBox} className="mr-2 text-amber-700" />
                  <span>{tour.package_description}</span>
                </div>
                <div className="mb-2">
                  <FontAwesomeIcon
                    icon={faDollarSign}
                    className="mr-2 text-amber-700"
                  />
                  <span>${tour.package_price}</span>
                </div>
                <div className="mb-2">
                  <FontAwesomeIcon icon={faUsers} className="mr-2 text-amber-700" />
                  <span>Spaces Left: {tour.space_left}</span>
                </div>
                <div className="mb-2">
                  <FontAwesomeIcon icon={faUser} className="mr-2 text-amber-700" />
                  <span>Total Spaces: {tour.total_space}</span>
                </div>
                <div className="absolute bottom-4 right-4 space-x-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                    onClick={() => editTour(tour._id)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                    onClick={() => deleteTour(tour._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-3 text-gray-500">
              No tours available.
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default TGHome;
