import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../consts";
import illustratie from "./illu_home.gif";
import style from "./Home.module.css"
import FilterSwitch from "../../../components/FilterSwitch/FilterSwitch";

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
          <h3 className={style.banner__title}>DIT IS DURVEN</h3>
          <p className={style.banner__text}>
            Kortrijk zoekt echte durvers om maatschappelijke uitdagingen aan te pakken
          </p>
          <h4 className={style.banner__subtitle}>PROJECT OPROEP:</h4>
          <p className={style.banner__quote}>Samen pakken we eenzaamheid aan!</p>
          <Link className={style.banner__button} to={ROUTES.addProject}>Start zelf een project</Link>
        </div>
        <img className={style.baner__img} src={illustratie} alt="home illustratie"/>
      </div>
      <FilterSwitch handleCallback={handleCallback} map={map} token={token} />
    </>
  );
};

export default Home;