import React, {useState} from "react";
import style from "./Acount.module.css";
import Projects from "../../../components/Acount/Projects";
import Info from "../../../components/Acount/Info";
import Comments from "../../../components/Acount/Comments";
import user from "./hippie.png";
import map from "./projects.svg";
import bericht from "./comments.svg";
import i from "./info.svg";

const Acount = () => {
  const [info, setInfo] = useState("Projects");

  const button = (value) => {
    setInfo(value)
  }

  const infoSwitch = (info) => {
    switch (info) {
      case 'Projects':
        return  <Projects/>;
      case 'Info':
        return  <Info/>;
      case 'Comments':
        return  <Comments/>;
      default: return <Projects/>;
    }
  }

  // const { projectStore, uiStore } = useStores();

  return (
    <>
      <div className={style.user__container}>
        <img src={user} alt="user foto"/>
        <p className={style.user__info}>
          <span className={style.user__name}>Floyd Miles</span>
          <span className={style.user__date}>Lid sinds 8/15/21</span>
        </p>
      </div>

      <div className={style.buttons}>
        <button className={`${info === 'Projects' ? style.info__button__active : style.info__button }`} 
          onClick={() => button('Projects')}>
          <img className={style.info__icon} src={map} alt="projects icon"/>
          <span>Mijn projecten</span>
        </button>

        <button className={`${info === 'Comments' ? style.info__button__active : style.info__button }`} 
          onClick={() => button('Comments')}>
          <img className={style.info__icon} src={bericht} alt="comments icon"/>
          <span>Mijn comments</span>
        </button>

        <button className={`${info === 'Info' ? style.info__button__active : style.info__button }`} 
          onClick={() => button('Info')}>
          <img className={style.info__icon} src={i} alt="info icon"/>
          <span>Info</span>
        </button>
      </div>

      { infoSwitch(info) }
    </>
  );
};

export default Acount;
