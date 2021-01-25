import React from "react";
import { MapContainer, TileLayer} from 'react-leaflet'
//import style from "./Map.module.css"

const Map = () => {

  return (
    <>
      <MapContainer center={[50.82803, 3.26487]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </>
  );
};

export default Map;
