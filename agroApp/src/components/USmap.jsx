import React from "react";
import { Map, TileLayer } from "react-leaflet";

const USMap = () => {
  return (
    <Map center={[37.8, -96]} zoom={4} style={{ height: "500px" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      />
    </Map>
  );
};

export default USMap;
