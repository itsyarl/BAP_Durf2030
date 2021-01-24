import React, { useState } from "react";
import ProjectList from "../../../components/ProjectList/ProjectList"
import Filter from "../../../components/Filter/Filter";
import Map from "../../../components/Map/Map";
import style from "./Home.module.css"
import { Button } from "@material-ui/core";

const Home = ({ token }) => {

  const [map, setMap] = useState(false);

  const showProjects = () => {
    setMap(false)
  }
  const showMap = () => {
    setMap(true)
  }

  return (
    <>
      <h3>Home</h3>
      <Filter />
      <div>
        <Button onClick={showProjects} variant="contained" color={map ? "" : "primary" }>
          Show projects
        </Button>
        <Button onClick={showMap} variant="contained" color={map ? "primary" : "" }>
          Show map
        </Button>
      </div>
      { map
        ? <Map />
        : <ProjectList token={token} />
      }
    </>
  );
};

export default Home;