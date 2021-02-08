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
    <section>
      <h2 className="hidden">funding</h2>
      <Link className={style.details__link} to={`${ROUTES.projectDetail.to}${project.id}`}>
        <div className={style.driehoek}></div>
        <p className={style.details__link__tekst}>Terug naar projecten</p>
      </Link>
      <h3 className={style.title}>{project.title}</h3>
      <p className={style.paragraaf}>Help dit project hun boodschappenlijstje af te vinken!</p>

      <ul className={style.funding__list}>
        {fundingStore.funding.map((funding, index) => (
          <li className={style.funding__item} key={funding.id}>
            <p><span className={style.funnding__item__number}>#{index + 1}</span> {funding.product}</p>
            <p>{funding.aantal}</p>
            <input className={style.funding__item__input} type="number" value={amount} onChange={e => setAmount(e.target.value)}></input>
            <button onClick={e => doneer(e, funding)}>Doneer</button>
          </li>
        ))}
      </ul>
      
      <h3 className={style.tussenTitle}>Afleveren</h3>
      <p className={style.text}>Hoe ga je jouw donatie afleveren?</p>
      <div>
        <button className={style.button_fundig}>Ophalen</button>
        <button className={style.button_fundig}>Versturen</button>
      </div>
      <p className={style.text}>*geld donaties gebeuren via de bank</p>

      <form className={style.form}>
        <label className={style.label}>
          <h3 className={style.tussenTitle}>Adres</h3>
          <span className={style.text}>Straat, nr</span>
          <input className={style.input}></input>
          <span className={style.text}>*Dit is nodig om te weten waar de eigenaar de materialen kan ophalen.</span>
        </label>
        <div className={style.buttons}>
          <button className={style.button_fundig}>Doneren</button>
          <Link to={`${ROUTES.projectDetail.to}${project.id}`} className={style.button_annuleren}>Annuleren</Link>
        </div>
      </form>
    </section>
  ));
};

export default Funding;
