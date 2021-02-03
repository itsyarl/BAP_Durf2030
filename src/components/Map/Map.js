import { Icon } from "leaflet";
import { useObserver } from "mobx-react-lite";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import { useStores } from "../../hooks/useStores";
import img from "./projectmarker4.svg"
// import style from "./Map.module.css"

const Map = () => {

  const { projectStore } =  useStores();

  const icon = new Icon({
    iconUrl: img,
    iconSize: [40, 40]
  });

  return useObserver( () => (
    <>
      <MapContainer center={[50.82803, 3.26487]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      {projectStore.filtered.map(project => (
        <Marker 
          key={project.id} 
          position={[project.geo.lat, project.geo.lng]}
          icon={icon}   
        >
          <Popup>
              <h2>adres: {project.location}</h2>
              <h3>categorie: {project.theme}</h3>
              <p>ownerId: {project.ownerId}</p>
              <p>status: {project.status}</p>
            </Popup>

        </Marker>
      ))}
      </MapContainer>
    </>
  ));
};

export default Map;
