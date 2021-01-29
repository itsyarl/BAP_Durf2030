import React from "react";
import style from "./GuideInfo.module.css"

const Funding = () => {

  return (
    <>
      <h3 className={style.title}>Hoe kan ik een project funden?</h3>
      <p className={`${style.vs__list__item__small} ${style.Basics__icons__item} ${style.space}`}>
        Op elke detail pagina van een project staat een lijst met alle benodigdheden om dit project door te kunnen laten gaan. Wil je helpen door 1 van die benodigheden te doneren dan kan je simpelweg op de doneer knop drukken!
      </p>
      <h3 className={style.title}>Maar hoe komen mijn items dan bij de eigenaar van het project?</h3>
      <p className={`${style.vs__list__item__small} ${style.Basics__icons__item}`}>Je kan je items opsturen naar het adres dat de eigenaar heeft opgegeven of je laat hem er zelf omkomen. Wil je iets specifieker afspreken kan je altijd de chat gebruiken.</p>
      <span className={style.aandacht}>Aandacht!</span>
      <p className={style.vs__list__item__small}>Voor jouw veiligheid word de locatie die je  opgeeft om de items te laten ophalen alleen gedeeld met de eigenaar. Geef nooit persoonlijke gegevens mee in de chat!</p>
    </>
  );
};

export default Funding;
