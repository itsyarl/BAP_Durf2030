import React from "react";
import style from "./Acount.module.css";
import { Link } from "react-router-dom";
import { ROUTES } from "../../consts";
import icon from "./duim.svg";
import bewerk from "./bewerk.svg";
import beheren from "./beheren.svg";

const Projects = () => {
  const classSwitch = (status) => {
    switch (status) {
      case 'Bezig':
        return  style.bezig;
      case 'Uitvoering':
        return  style.klaar;
      case 'Afgerond':
        return  style.afgerond;
      default: return style.bezig;
    }
  }

  return (
    <ul className={style.grid}>
      <li>
        <div>
          <div className={style.proj__img}>
            <div className={style.proj__img__box}>
              <span>users</span>
              <p><Link className={style.proj__details} to={ROUTES.home}>meer details</Link></p>
            </div>
            <div className={style.proj__detail__buttons}>
              <button className={style.proj__detail__button}><Link to={ROUTES.home}><img src={bewerk} alt="bewerk"/></Link></button>
              <button className={style.proj__detail__button}><Link to={ROUTES.home}><img src={beheren} alt="beheren"/></Link></button>
            </div>
          </div>
          <div className={style.proj__container}>
          
          <div className={style.proj__box}>
            <span className={style.proj__theme}>theme</span>
            <span className={style.proj__status}>Bezig<div className={classSwitch('Bezig')}></div></span>
          </div>
          <h2 className={style.proj__title}>test</h2>
          <div className={style.proj__boxlike}>
            <img className={style.proj__likeicon} src={icon} alt="like icon"/>
            <span className={style.proj__like}>23</span>
          </div>
          </div>
        </div>
      </li>

      <li>
        <div>
          <div className={style.proj__img}>
            <div className={style.proj__img__box}>
              <span>users</span>
              <p><Link className={style.proj__details} to={ROUTES.home}>meer details</Link></p>
            </div>
            <div className={style.proj__detail__buttons}>
              <button className={style.proj__detail__button}><Link to={ROUTES.home}><img src={bewerk} alt="bewerk"/></Link></button>
              <button className={style.proj__detail__button}><Link to={ROUTES.home}><img src={beheren} alt="beheren"/></Link></button>
            </div>
          </div>
          <div className={style.proj__container}>
          
          <div className={style.proj__box}>
            <span className={style.proj__theme}>theme</span>
            <span className={style.proj__status}>Bezig<div className={classSwitch('Bezig')}></div></span>
          </div>
          <h2 className={style.proj__title}>test2</h2>
          <div className={style.proj__boxlike}>
            <img className={style.proj__likeicon} src={icon} alt="like icon"/>
            <span className={style.proj__like}>8</span>
          </div>
          </div>
        </div>
      </li>
    </ul>
  );
};

export default Projects;