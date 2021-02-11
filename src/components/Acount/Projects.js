import React from "react";
import style from "./Acount.module.css";
import styles from "../Project/Project.module.css";
import { Link } from "react-router-dom";
import { ROUTES } from "../../consts";
import icon from "./duim.svg";
import bewerk from "./bewerk.svg";
import beheren from "./beheren.svg";
import { useStores } from "../../hooks/useStores";
import { useObserver } from "mobx-react-lite";


const Projects = ({ project, owner }) => {

  const { uiStore } = useStores();

  const Image = {
    backgroundImage: 'linear-gradient(180deg, rgba(30, 30, 30, 0.55) 6.29%, rgba(28, 28, 28, 0) 25.81%),url(' + project.image.url + ')',
  };

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
          <div>
            <div style={Image} className={style.proj__img}>
              <div className={style.proj__img__box}>
                <div className={styles.proj__users__data}>
                  <img src={owner.avatar} width="20" alt="avatar van owner" />
                  <span className={styles.proj__owners}>+{project.coOwners.length}</span>
                  <span className={styles.proj__user}>+{project.participants.length}</span>
                </div>
                {uiStore.currentUser.id === project.ownerId ? (
                  <div className={style.proj__detail__buttons}>
                    <button className={style.proj__detail__button}><Link to={`${ROUTES.editProject.to}${project.id}`}><img src={bewerk} alt="bewerk"/></Link></button>
                    <button className={style.proj__detail__button}><Link to={`${ROUTES.dataProject.to}${project.id}`}><img src={beheren} alt="beheren"/></Link></button>
                  </div>
                ):(
                  <p><Link className={style.proj__details} to={`${ROUTES.projectDetail.to}${project.id}`}>meer details</Link></p>
                )}



              </div>
            </div>
            <div className={style.proj__container}>
            
            <div className={style.proj__box}>
              <span className={style.proj__theme}>{project.theme}</span>
              <span className={style.proj__status}>{project.status}<div className={classSwitch('Bezig')}></div></span>
            </div>
            <h4 className={style.proj__title}>{project.title}</h4>
            <div className={style.proj__boxlike}>
              <img className={style.proj__likeicon} src={icon} alt="like icon"/>
              <span className={style.proj__like}>{project.likes}</span>
            </div>
            </div>
          </div>
        </li>

  ));
};

export default Projects;