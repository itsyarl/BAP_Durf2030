import React, { useState } from "react";
import ProjectList from "../../../components/ProjectList/ProjectList"
import Filter from "../../../components/Filter/Filter";
import Map from "../../../components/Map/Map";
import { Link } from "react-router-dom";

// import style from "./Home.module.css"

const Home = ({ token }) => {
  const [map, setMap] = useState("");

  const handleCallback = (map) =>{
    setMap(map)
  }

  return (

    <>
      <h3>Home</h3>
      <Filter callBackMap={handleCallback}/>
      { map
        ? <Map />
        : <ProjectList token={token} />
      }
      <Link to="/addproject">addproject</Link>
    </>
  );
};

export default Home;