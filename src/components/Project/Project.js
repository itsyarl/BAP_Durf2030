import React from "react";
import { useStores } from "../../hooks/useStores";
import { Link } from "react-router-dom";
import { ROUTES } from "../../consts";
import style from "./Project.module.css";
import { useObserver } from "mobx-react-lite";
import icon from "./duim.svg";


const Project = ({project}) => {
  const { uiStore } = useStores();

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

  return useObserver(() => (
    <li>
      <Link to={`${ROUTES.projectDetail.to}${project.id}`}>
        <div className={style.proj__img}>
          <div className={style.proj__img__box}>
            <span>users</span>
            {uiStore.currentUser.id === project.ownerId ? (
              <p className={style.proj__details}>
                <span>Aanpassen</span>
              </p>
            ) : (
              <p className={style.proj__details}>
                <span>Meer details</span>
              </p>
            )}
          </div>
        </div>
        <div className={style.proj__container}>
          
          <div className={style.proj__box}>
            <span className={style.proj__theme}>{project.theme}</span>
            <span className={style.proj__status}>{project.status}<div className={classSwitch(project.status)}></div></span>
          </div>
          <h3 className={style.proj__title}>{project.title}</h3>
          <div className={style.proj__boxlike}>
            <img className={style.proj__likeicon} src={icon} alt="like icon"/>
            <span className={style.proj__like}>{project.likes}</span>
          
          </div>
          </div>
        </Link>
      </li>
  ));
};

export default Project;
