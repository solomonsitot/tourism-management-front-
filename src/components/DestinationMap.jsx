import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const DestinationMap = ({ lat, lng, name, description, image }) => (
  <MapContainer
    center={[lat, lng]}
    zoom={10}
    style={{ height: "300px", width: "100%" }}
  >
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    />
    <Marker position={[lat, lng]}>
      <Popup>
        <div>
          <h2>{name}</h2>
          <p>{description}</p>
          <img
            src={image}
            alt={name}
            className="w-full h-24 object-cover rounded-lg"
          />
        </div>
      </Popup>
    </Marker>
  </MapContainer>
);

export default DestinationMap;
