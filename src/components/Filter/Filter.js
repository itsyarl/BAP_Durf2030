import React, { useState } from "react";
import style from "./Filter.module.css";
import { useStores } from "../../hooks/useStores";
import grid from "./grid.svg";
import Map from "./map.svg";

const Filter = ({callBackMap}) => {
  const { projectStore} = useStores();

  const [map, setMap] = useState("");
  const [thema, setThema] = useState("all");
  const [status, setStatus] = useState("Funding");
  const [sorteren, setSorteren] = useState("Geen");

  const showProjects = (e) => {
    e.preventDefault();
    callBackMap(false);
    setMap(false);
  }
  const showMap = async (e) => {
    e.preventDefault();
    await callBackMap(true);
    setMap(true);
    window.scrollTo(0, document.body.scrollHeight);
  }

  const sorter = (type) => {
    setSorteren(type);
    filter(status, thema, type);
  }

  const filter = (status, thema, sorteren) => {
    setThema(thema); 
    setStatus(status);

    try {
      projectStore.filterProjects(thema, status, sorteren);
      // console.log(filtered);
    } catch (error) {
      console.log(error);
    }

  }

  return(
    <div className={style.filter__container}>
      <h3 className={style.filter__title}>Filter</h3>
      <div className={style.filter__container__box}>
        <div className={style.filter__sorteren}>
          <span className={style.filter__span}>Sorteren op:</span>
          <div>
            <button className={sorteren === "Geen" ? style.filter__button__sorteren : style.filter__button} onClick={() => sorter("Geen")}>Geen</button>
            <button className={sorteren === "Nieuw" ? style.filter__button__sorteren : style.filter__button} onClick={() => sorter("Nieuw")}>Nieuw</button>
            <button className={sorteren === "Populair" ? style.filter__button__sorteren : style.filter__button} onClick={() => sorter("Populair")}>Populair</button>
          </div>
        </div>
        
        <div className={style.filter__status}>
          <span className={style.filter__span}>Status:</span>
          <div>
            <button className={status === "Funding" ? style.filter__button__status : style.filter__button} onClick={() => filter("Funding", thema)}>Funding</button>
            <button className={status === "Uitvoering" ? style.filter__button__status : style.filter__button} onClick={() => filter("Uitvoering", thema)}>Uitvoering</button>
            <button className={status === "Voltooid" ? style.filter__button__status : style.filter__button} onClick={() => filter("Voltooid", thema)}>Voltooid</button>
          </div>
        </div>

        <div className={style.filter__thema}>
          <span className={style.filter__span}>Thema:</span>
          <select className={style.filter__select} name="thema" id="thema" value={thema} onChange={e => filter(status, e.target.value)}>
            <option value="all">Alle</option>
            <option value="Eenzaamheid">Eenzaamheid</option>
          </select>
        </div>

        <div>
          <span className={style.filter__span}>Weergaven:</span>
          <div className={style.map__projects}>
            <img src={grid} alt="projects icon" onClick={e => showProjects(e)} className={map ? style.secondary : style.primary }/>
            <img src={Map} alt="map icon" onClick={e => showMap(e)} className={map ? style.primary : style.secondary }/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
