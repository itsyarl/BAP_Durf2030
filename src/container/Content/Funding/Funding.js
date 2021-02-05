import React from "react";
import style from "./Funding.module.css";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../consts";

const Funding = () => {

  return (
    <>
      <Link className={style.details__link} to={ROUTES.home}>
        <div className={style.driehoek}></div>
        <p className={style.details__link__tekst}>Terug naar projecten</p>
      </Link>
      <h3 className={style.test}>Rope: Het verbinden van een gemeenschap</h3>
      <p>Help dit project hun boodschappenlijstje af te vinken!</p>

      <p>hier komt een komponent</p>

      
      <h4>Afleveren</h4>
      <p>Hoe ga je jouw donatie afleveren?</p>
      <div>
        <button>Ophalen</button>
        <button>Versturen</button>
      </div>

      <form>
        <label>
          Adres
          <span>Straat, nr</span>
          <input></input>
          <span>*Dit is nodig om te weten waar de eigenaar de materialen kan ophalen.</span>
        </label>
        <div>
          <button>Doneren</button>
          <button>Annuleren</button>
        </div>
      </form>
    </>
  );
};

export default Funding;
