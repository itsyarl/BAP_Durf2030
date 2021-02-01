import React from "react";
import style from "./GuideInfo.module.css"

const Deelnemen = () => {

  return (
    <>
      <div className={style.basics__wat__container}>
        <h3 className={style.title}>Hoe neem ik deel aan een project?</h3>
        <p className={style.paragraaf}>Op elke detail pagina van een project kan je op de deelnemen knop drukken.</p>
        <p className={style.Basics__icons__item__status}>Wanneer je deelneemt aan een project komt deze onder jouw projecten te staan en word je automatisch toegevoegd aan een chat groep.</p>

        <h4 className={style.tussen__title}>Chat:</h4>
        <p className={style.Basics__icons__item__status}>In de chatgroep kan je dingen bespreken en vragen stellen wanneer nodig.</p>
      </div>
      <div className={style.basics__wat__container}>
        <h3 className={style.title}>Rollen</h3>
        <p className={style.Basics__icons__item__status}>Wanneer je een rol hebt komt deze automatisch bij jouw naam te staan.</p>

        <h4 className={style.tussen__title}>Voor eigenaar:</h4>
        <p className={style.Basics__icons__item__status}>Je kan rollen toevoegen en verwijderen op de bewerkpagina van jouw project. Het uitdelen van een rol aan 1 van de deelnemers gebeurt via de beheerpagina.</p>

        <h4 className={style.tussen__title}>Voor deelnemer:</h4>
        <p>Rollen worden uitgedeeld door de eigenaar. Wil je een specifieke rol? Vraag het even in de chat.</p>
      </div>
    </>
  );
};

export default Deelnemen;
