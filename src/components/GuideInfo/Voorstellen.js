import React from "react";
import style from "./GuideInfo.module.css"

const Voorstellen = () => {

  return (
    <div className={style.guide__content}>
      <h3 className={style.title}>Project oproep</h3>
      <p className={style.vs__paragraaf}>
        DURF2030 lanceert een aantal keer per jaar een thematische oproep voor projecten. Deze kan men bekijken op de home pagina/projecten.
      </p>

      <h3 className={style.title}>Project voorstellen</h3>
      <p className={style.vs__paragraaf}>
        Wie met een idee of concreet voorstel zit dat niet , kan ook terecht op www.durf2030.eu of zodra het weer mag, binnenspringen in Café BK6. Broelkaai 6 is de uitvalbasis van DURF2030. 
      </p>

      <ul className={style.vs__list}>
        <li className={style.vs__list__item}>Je hebt EEN IDEE dat beantwoordt aan de projectcriteria van DURF2030</li>
        <li className={style.vs__list__item}>Je dient je project in via het formulier op de website van DURF2030.</li>
        <li className={style.vs__list__item}>Je pitcht jouw project tijdens een DURF coffee of DURF cocktail (data vind je hier).</li>
        <li className={style.vs__list__item}>Samen met jou bekijkt het DURF-team welke ondersteuning jouw project nodig heeft.</li>
        <li className={`${style.vs__list__item} ${style.vs__list__item__small}`}>Wat kan DURF2030 voor jou doen?
          DURF verbindt: we brengen je in contact met relevante organisaties en individuen. 
          DURF toont: jouw project staat in de kijker op onze website en sociale media.
          DURF inspireert: via workshops, infosessies, lezingen, bootcamps zorgen we voor de nodige creatieve input voor je project. 
          DURF ondersteunt: waar mogelijk krijg je ondersteuning bij het organiseren, zoeken naar financiering en communiceren van je project.
        </li>
        <li className={`${style.vs__list__item} ${style.vs__list__item__small}`}>Zodra je project op punt staat, kan je project van start gaan. Naast je eigen communicatie-acties, zetten wij jouw project op de website van DURF2030 en promoten het via onze sociale media kanalen.</li>
        <li className={`${style.vs__list__item} ${style.vs__list__item__small}`}>Voor, tijdens en na je project hou je de impact die je maakt in het oog. Dit kan op vele manieren: maak foto's, video's, doe interview met deelnemers, hoe een blog bij,...</li>
      </ul>

      <h3 className={style.title}>Project criteria</h3>
      <ul className={style.vs__list}>
        <li className={style.vs__list__item}>Positieve verandering op het leven in onze buurt, Stad Kortrijk en regio</li>
        <li className={style.vs__list__item}>Kunst of creativiteit als tool</li>
        <li className={style.vs__list__item}>Betrekken van actieve burgers en/of creatieve ondernemers</li>
      </ul>

      <p className={style.vs__paragraaf_up}>Dit geeft een extra meerwaarde aan het project:</p>

      <ul className={style.vs__list}>
        <li className={style.vs__list__item}>Het project is toepasbaar in andere contexten</li>
        <li className={style.vs__list__item}>Vernieuwend: nieuw idee of nieuwe aanpak (geen bestaande werking of project)</li>
        <li className={style.vs__list__item}>Samenwerking met partners uit andere sectoren/buiten jouw gekende wereld</li>
      </ul>
    </div>
  );
};

export default Voorstellen;
