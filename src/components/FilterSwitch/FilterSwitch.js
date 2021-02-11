import React, { useState } from "react";
import ProjectList from "../../components/ProjectList/ProjectList"
import Filter from "../../components/Filter/Filter";
import Map from "../../components/Map/Map";

const FilterSwitch = ({ token }) => {
  const [map, setMap] = useState("");

  const handleCallback = (map) =>{
    setMap(map)
  }

  return (
    <>
      <Filter callBackMap={handleCallback}/>
      {map ? (
        <Map />
      ):(
        <ProjectList token={token}/>
      )}
    </>
  );
};
export default FilterSwitch;