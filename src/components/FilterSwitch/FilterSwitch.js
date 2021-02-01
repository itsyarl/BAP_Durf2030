import React from "react";
import ProjectList from "../../components/ProjectList/ProjectList"
import Filter from "../../components/Filter/Filter";
import Map from "../../components/Map/Map";

const FilterSwitch = ({map, token}) => {

  return (
    <>
      <Filter />
      {map ? (
        <Map />
      ):(
        <ProjectList token={token}/>
      )}
    </>
  );
};
export default FilterSwitch;