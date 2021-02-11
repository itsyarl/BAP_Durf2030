import React from "react";
import style from "./GuideInfo.module.css"
import bar from "./funding.png"

const Beheren = () => {

  return (
    <div className={style.beheren}>
      <h3 className={style.title}>Data</h3>
      <p>Op de data pagina vind je alle informatie over de stand van jouw project.</p>
      <img className={style.beheren__img} src={bar} alt="funding bar"/>
      <p className={`${style.vs__list__item__small} ${style.Basics__icons__item} ${style.space}`}>Je kan zien wie, wat, waneer heeft gedoneerd en ze een bedankje sturen door op het hartje te klikken. (De bedanking is een automatisch bericht)</p>

      <h3 className={style.title}>Status</h3>
      <p className={`${style.Basics__icons__item} ${style.space}`}>De status veranderd automatisch.</p>

      <h3 className={style.title}>Impact formulier</h3>
      <p className={style.vs__list__item__small}>Zodra je project klaar is vul je het impact formulier in. Dit formulier kan anderen helpen bij het inspireren om een project op te starten en men kan leren uit de fouten en of successsen van jouw project.</p>
      <p>Dit kan ook een filmpje zijn</p>
      <p className={`${style.vs__list__item__small} ${style.Basics__icons__item} ${style.space}`}>Neem alsjeblieft je tijd hiervoor, dit is een belangrijk formulier.</p>

      <h3 className={style.title}>Project bewerken</h3>
      <p className={style.vs__list__item__small}>Als eigenaar kan je op elk moment jouw project aanpassen op de bewerkpagina. Updates over je project vind je op de detail pagina naast de comment sectie.</p>
    </div>
  );
};

export default Beheren;
