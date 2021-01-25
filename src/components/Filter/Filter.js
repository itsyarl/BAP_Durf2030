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
      <div className={style.test}>
        <>
          <h3>filter</h3>
          <Button onClick={showProjects} variant="contained" color={map ? "secondary" : "primary" }>
            Show projects
          </Button>
          <Button onClick={showMap} variant="contained" color={map ? "primary" : "secondary" }>
            Show map
          </Button>
          </>
      </div>
  );
};

export default Filter;
