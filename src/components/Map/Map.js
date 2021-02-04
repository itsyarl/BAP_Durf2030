import { Icon } from "leaflet";
import { useObserver } from "mobx-react-lite";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import { Link } from "react-router-dom";
import { ROUTES } from "../../consts";
import { useStores } from "../../hooks/useStores";
import img from "./projectmarker4.svg";
import style from "./Map.module.css"

const Map = () => {

  const { projectStore } =  useStores();

  const classSwitch = (status) => {
    switch (status) {
      case 'Bezig':
        return  style.bezig;
      case 'Uitvoering':
        return  style.klaar;
      case 'Afgerond':
        return  style.afgerond;
      default: return style.bezig;
    }
  }

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
          <Popup className={style.popup}>
            <h3 className={style.title}>{project.title}</h3>
            <div className={style.info1}>
              <p className={style.theme}>{project.theme}</p>
              <div className={classSwitch(project.status)}></div>
            </div>
            <div className={style.info2}>
              <p>user</p>
              <Link className={style.link} to={`${ROUTES.projectDetail.to}${project.id}`}>Meer details</Link>
            </div>
          </Popup>
        </Marker>
      ))}
      </MapContainer>
    </>
  ));
};

export default Map;
