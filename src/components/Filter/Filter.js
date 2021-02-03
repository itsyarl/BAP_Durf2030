import React, { useState } from "react";
import style from "./Filter.module.css";
import { Button } from "@material-ui/core";
import { useStores } from "../../hooks/useStores";


const Filter = ({callBackMap}) => {
  const { projectStore} = useStores();

  const [map, setMap] = useState("");
  const [thema, setThema] = useState("all");
  const [status, setStatus] = useState("Bezig");
  // const [filteredItems, setFilteredItems] = useState("");

  const showProjects = () => {
    callBackMap(false);
    setMap(false);
  }
  const showMap = () => {
    callBackMap(true);
    setMap(true);
  }

  const filter = (status, thema) => {
    setThema(thema); 
    setStatus(status);

    try {
      projectStore.filterProjects(thema, status);
      // console.log(filtered);
    } catch (error) {
      console.log(error);
    }

  }

  return(
    <div className={style.filter__container}>
      <h4 className={style.filter__title}>Filter</h4>

      <span>Status:</span>
      <Button onClick={() => filter("Afgerond", thema)}>Afgerond</Button>
      <Button onClick={() => filter("Bezig", thema)}>Bezig</Button>

      <span>Thema:</span>
      <select name="thema" id="thema" value={thema} onChange={e => filter(status, e.target.value)}>
        <option value="all">Alle</option>
        <option value="Eenzaamheid">Eenzaamheid</option>
      </select>

      <span>Sorteren op:</span>
      <button>populair</button>
      <button>nieuw</button>
      
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
