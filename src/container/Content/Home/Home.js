import React, { useState } from "react";
import ProjectList from "../../../components/ProjectList/ProjectList"
import Filter from "../../../components/Filter/Filter";
import Map from "../../../components/Map/Map";
import ProgresBar from "../../../components/ProgresBar/ProgresBar";
import { Link } from "react-router-dom";
import illustratie from "./illu.svg";
import style from "./Home.module.css"

// import style from "./Home.module.css"

const Home = ({ token }) => {
  const [map, setMap] = useState("");

  const handleCallback = (map) =>{
    setMap(map)
  }

  return (

    <>
      <div className={style.banner}>
        <div className={style.banner__container}>
          <h3 className={style.banner__title}>DURF 2030</h3>
          <ProgresBar/>
          <p className={style.banner__text}>
            Durvers gezocht om maatschappelijke uitdagingen aan te pakken.
          </p>
          <h4 className={style.banner__subtitle}>PROJECT OPROEP:</h4>
          <p className={style.banner__quote}>Samen pakken we eenzaamheid aan!</p>
          <Link className={style.banner__button} to="/addproject">Start zelf een project</Link>
        </div>
        <img src={illustratie} alt="home illustratie"/>
      </div>

      <Filter callBackMap={handleCallback}/>
      { map
        ? <Map />
        : <ProjectList token={token} />
      }
    </>
  );
};

export default Home;