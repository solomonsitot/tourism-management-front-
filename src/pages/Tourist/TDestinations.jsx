import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav";
import axios from "axios";
import DestinationMap from "../../components/DestinationMap";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import useRedirectLogoutUsers from "../../hooks/redirectLogoutUsers";

// Fix marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const TDestinations = () => {
  useRedirectLogoutUsers("/login");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [destinations, setDestinations] = useState([
    {
      _id: "1",
      dest_name: "Addis Ababa",
      dest_description:
        "The capital city of Ethiopia. Addis Ababa, the capital city of Ethiopia, is a sprawling city in the highlands bordering the Great Rift Valley. It's the country's commercial and cultural hub. Its National Museum exhibits Ethiopian art, traditional crafts, and prehistoric fossils, including replicas of the famous early hominid, 'Lucy.' The burial place of the 20th-century emperor Haile Selassie, the copper-domed Holy Trinity Cathedral, is a neo-baroque architectural landmark.",
      dest_image: "https://via.placeholder.com/150",
      dest_location: { lat: 9.03314, lng: 38.74462 },
    },
  ]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/destinations/get-all`)
      .then((response) => {
        setDestinations(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <Nav
        href0="/tourist"
        link1="Discover"
        href1="/tourist/destinations"
        link2="Blogs"
        href2="/tourist/see-blogs"
        link3="Hotels"
        href3="/tourist/see-hotels"
        link4="Tours"
        href4="/tourist/tours"
      />
      <div className="min-h-screen bg-white text-green-950 flex flex-col items-center p-4">
        <h1 className="text-4xl font-bold mb-8">
          Tourist Destinations
        </h1>
        <div className="grid grid-cols-1 gap-8 w-full max-w-6xl mb-8">
          {destinations.map((destination) => (
            <div
              key={destination._id}
              className="bg-white text-green-950 p-6 rounded-lg shadow-lg flex flex-col lg:flex-row"
              style={{ minHeight: "500px" }} // Increased minimum height for more space
            >
              <div className="flex flex-col lg:w-1/2 mb-4 lg:mb-0">
                <img
                  src={destination.dest_image}
                  alt={destination.dest_name}
                  className="w-full h-48 object-cover rounded-t-lg mb-4"
                />
                <h2 className="text-2xl font-bold mb-2">
                  {destination.dest_name}
                </h2>
                <div
                  className="text-base mb-4 overflow-y-auto"
                  style={{ maxHeight: "150px" }}
                >
                  {destination.dest_description}
                </div>
              </div>
              <div className="lg:w-1/2 lg:pl-4 flex-grow">
                <div
                  className="rounded-lg overflow-hidden h-full"
                  style={{ height: "100%" }} // Ensure the map fills the height of the container
                >
                  <DestinationMap
                    lat={destination.dest_location.lat}
                    lng={destination.dest_location.lng}
                    name={destination.dest_name}
                    description={destination.dest_description}
                    image={destination.dest_image}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TDestinations;
