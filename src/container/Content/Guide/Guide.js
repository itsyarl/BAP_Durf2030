import React, { useState }  from "react";
import style from "./Guide.module.css"
import Basics from "../../../components/GuideInfo/Basics";
import Beheren from "../../../components/GuideInfo/Beheren";
import Deelnemen from "../../../components/GuideInfo/Deelnemen";
import Funding from "../../../components/GuideInfo/Funding";
import Voorstellen from "../../../components/GuideInfo/Voorstellen";

const Guide = () => {
  const [info, setInfo] = useState("Basics");

  const button = (value) => {
    setInfo(value)
  }

  const infoSwitch = (info) => {
    switch (info) {
      case 'Basics':
        return  <Basics/>;
      case 'Beheren':
        return  <Beheren/>;
      case 'Deelnemen':
        return  <Deelnemen/>;
      case 'Funding':
        return  <Funding/>;
      case 'Voorstellen':
        return  <Voorstellen/>;
      default: return <Basics/>;
    }
  }

  return (
    <section>
      <h2 className={style.info__title}>Hoe ga je te werk?</h2>
      <div className={style.info__button__contianer}>
        <button 
          className={`${info === 'Basics' ? style.info__button__active : style.info__button }`} 
          onClick={() => button('Basics')}>
          Basics
        </button>
        <button 
          className={`${info === 'Voorstellen' ? style.info__button__active : style.info__button }`} 
          onClick={() => button('Voorstellen')}>
          Project voorstellen
        </button>
        <button 
          className={`${info === 'Beheren' ? style.info__button__active : style.info__button }`} 
          onClick={() => button('Beheren')}>
          Project beheren
        </button>
        <button 
          className={`${info === 'Deelnemen' ? style.info__button__active : style.info__button }`} 
          onClick={() => button('Deelnemen')}>
          Deelnemen
        </button>
        <button 
          className={`${info === 'Funding' ? style.info__button__active : style.info__button }`} 
          onClick={() => button('Funding')}>
          Funding
        </button>
      </div>
      { infoSwitch(info) }
    </section>
  );
};

export default Guide;
