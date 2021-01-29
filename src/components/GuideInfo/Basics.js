import React from "react";
import style from "./GuideInfo.module.css";
import project from "./project.png";
import data from "./icons/data.svg";
import bewerk from "./icons/bewerken.svg";
import mensen from "./icons/mensen.svg";
import chat from "./icons/chat.svg";
import account from "./icons/account.svg";
import like from "./icons/like.svg";
import map from "./icons/map.svg";
import kijken from "./icons/kijken.svg";
import gegevens from "./icons/gegevens.svg";
import add from "./icons/add.svg";
import mode from "./icons/mode.svg";
import alarm from "./icons/alarm.svg";

const Basics = () => {

  return (
    <div className={style.guide__content}>
      <div className={style.basics__wat__container}>
        <h3 className={style.title}>Wat?</h3>
        <p className={style.Basics__icons__item}>
          Kortrijk gaat experimenteren met nieuwe projecten die de contouren van de stad en regio van de toekomst uittekenen. Het platform DURF2030 wil zoveel mogelijk mensen stimuleren om ideeën te bedenken en uit te voeren. Bedoeling is om de komende 10 jaar maar liefst 2.030 projecten te realiseren. 
        </p>
        <p className={style.Basics__icons__item}>
          2030 moet het hoogtepunt worden; dat is het jaar waarin Kortrijk Culturele Hoofdstad van Europa wil zijn. Iedereen kan meedoen: inwoners, ondernemers, jongeren, organisaties, (hoge)scholen, kunstenaars, verbinders en veranderaars met een creatieve mindset.
        </p>
      </div>

      <div>
        <h3 className={style.title}>Icons</h3>
        <p className={style.Basics__icons__item__status}>Menu</p>
        <ul className={style.Basics__icons__grid}>
          <li className={style.Basics__icons__item}>
            <img className={style.Basics__icons__img} src={map} alt="project layout"/>
            <p>Bekijk alle projecten</p>
          </li>
          <li className={style.Basics__icons__item}>
            <img className={style.Basics__icons__img} src={chat} alt="project layout"/>
            <p>Groeps chat van alle projecten waar je aan deelneemt</p>
          </li>
          <li className={style.Basics__icons__item}>
            <img className={style.Basics__icons__img} src={kijken} alt="project layout"/>
            <p>Lijst van alle projecten die een beetje meer aandacht verdienen</p>
          </li>
          <li className={style.Basics__icons__item}>
            <img className={style.Basics__icons__img} src={gegevens} alt="project layout"/>
            <p>Bekijk alle contact gegevens</p>
          </li>
          <li className={style.Basics__icons__item}>
            <img className={style.Basics__icons__img} src={add} alt="project layout"/>
            <p>Voeg een project</p>
          </li>
          <li className={style.Basics__icons__item}>
            <img className={style.Basics__icons__img} src={mode} alt="project layout"/>
            <p>Verander het beeld van licht naar donker</p>
          </li>
          <li className={style.Basics__icons__item}>
            <img className={style.Basics__icons__img} src={account} alt="project layout"/>
            <p>Jouw eigen projecten bekijken</p>
          </li>
          <li className={style.Basics__icons__item}>
            <img className={style.Basics__icons__img} src={alarm} alt="project layout"/>
            <p>Alle meldingen over projecten en updates</p>
          </li>
        </ul>

        <p className={style.Basics__icons__item__status}>Projects</p>
        <ul className={style.Basics__icons__grid}>
          <li className={style.Basics__icons__item}>
            <img className={style.Basics__icons__img} src={like} alt="project layout"/>
            <p>Aantal likes</p>
          </li>
          <li className={style.Basics__icons__item}>
            <img className={style.Basics__icons__img} src={account} alt="project layout"/>
            <p>Updates die de eigenaar over het project deelt</p>
          </li>
          <li className={style.Basics__icons__item}>
            <img className={style.Basics__icons__img} src={chat} alt="project layout"/>
            <p>Opmerkingen bij een project</p>
          </li>
          <li className={style.Basics__icons__item}>
            <img className={style.Basics__icons__img} src={mensen} alt="project layout"/>
            <p>De deelnemers van een project</p>
          </li>
          <li className={style.Basics__icons__item}>
            <img className={style.Basics__icons__img} src={bewerk} alt="project layout"/>
            <p>Bewerken van een project (alleen als eigenaar)</p>
          </li>
          <li className={style.Basics__icons__item}>
            <img className={style.Basics__icons__img} src={data} alt="project layout"/>
            <p>Alle data over jouw project (alleen als eigenaar)</p>
          </li>
        </ul>
      </div>

      <div>
        <h3 className={style.title}>Project overzicht</h3>
        <img className={`${style.Basics__icons__item__status} ${style.space}`} src={project} alt="project layout"/>

        <h3 className={style.title}>Status?</h3>
        <ul>
          <li className={`${style.Basics__icons__item} ${style.Basics__icons__item__status}`}>
            <span className={`${style.Basics__ball} ${style.yellow}`}></span>
            <div>
              <h4 className={style.Basics__smalltitle}>In progress</h4>
              <p>Het project is goedgekeurd en zit in de funding fase</p>
            </div>
          </li>
          <li className={`${style.Basics__icons__item} ${style.Basics__icons__item__status}`}>
            <span className={`${style.Basics__ball} ${style.green}`}></span>
            <div>
              <h4 className={style.Basics__smalltitle}>Klaar</h4>
              <p>Het project is volledig gefund en word uitgevoerd</p>
            </div>
          </li>
          <li className={style.Basics__icons__item}>
            <span className={`${style.Basics__ball} ${style.blue}`}></span>
            <div>
              <h4 className={style.Basics__smalltitle}>Voltooid</h4>
              <p>Het project is afgewerkt en het impact formulier <span>(meer info over impact formulier)</span> is ingevuld</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Basics;
