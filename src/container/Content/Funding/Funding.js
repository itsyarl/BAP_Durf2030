import { useObserver } from "mobx-react-lite";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useStores } from "../../../hooks/useStores";
import style from "./Funding.module.css";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../consts";

const Funding = () => {
  const [amount, setAmount] = useState();

  const { id } = useParams();
  const { projectStore, fundingStore, uiStore } = useStores();
  const project = projectStore.getProjectById(id);

  const doneer = async(e, funding) => {
    e.preventDefault();
    funding.aantal = funding.aantal - amount;
    setAmount(0);

    await fundingStore.giveFunding(
      uiStore.currentUser.name,
      funding.product,
      id,
      funding.aantal
    );
  }

  return useObserver(() => (
    <>
      
      <Link className={style.details__link} to={ROUTES.home}>
        <div className={style.driehoek}></div>
        <p className={style.details__link__tekst}>Terug naar projecten</p>
      </Link>
      <h3 className={style.test}>{project.title}</h3>
      <p>Help dit project hun boodschappenlijstje af te vinken!</p>

      {fundingStore.funding.map(funding => (
        <>
          <span key={funding.id}>{funding.product}-----{funding.aantal}</span>
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)}></input>
          <button onClick={e => doneer(e, funding)}>Doneer</button>
        </>
      ))}
      
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
  ));
};

export default Funding;
