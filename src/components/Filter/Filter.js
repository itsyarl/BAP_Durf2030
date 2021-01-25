import React, { useState } from "react";
import style from "./Filter.module.css";
import { Button } from "@material-ui/core";

const Filter = ({callBackMap}) => {

  const [map, setMap] = useState("");

  const showProjects = () => {
    callBackMap(false);
    setMap(false);
  }
  const showMap = () => {
    callBackMap(true);
    setMap(true);
  }

  return(
    <div className={style.filter__container}>
      <h4 className={style.filter__title}>Filter</h4>
      
      <Button onClick={showProjects} variant="contained" color={map ? "secondary" : "primary" }>
        Show projects
      </Button>

      <Button onClick={showMap} variant="contained" color={map ? "primary" : "secondary" }>
        Show map
      </Button>
    </div>
  );
};

export default Filter;
