import React from "react";
import { useStores } from "../../hooks/useStores";
import { Link } from "react-router-dom";
import { ROUTES } from "../../consts";
import style from "./Project.module.css";
import { useObserver } from "mobx-react-lite";
import icon from "./duim.svg";


const Project = ({project}) => {
  const { uiStore } = useStores();
  console.log(uiStore.currentUser.id);
  console.log(project);
  return useObserver(() => (
    <li>
      <Link to={`${ROUTES.projectDetail.to}${project.id}`}>
<<<<<<< HEAD
      <div className={style.proj__img}>
        <div className={style.proj__img__box}>
          <span>users</span>
          {uiStore.currentUser.id === project.ownerId ? (
            <Link to={`${ROUTES.dataProject.to}${project.id}`} className={style.proj__details}>Edit</Link>
          ) : (
            <p className={style.proj__details}>
              <span>Meer details</span>
            </p>
          )}
=======
        <div className={style.proj__img}>
          <div className={style.proj__img__box}>
            <span>users</span>
            {uiStore.currentUser.id === project.ownerId ? (
                <button className={style.proj__details}>Edit</button>
            ) : (
              <p className={style.proj__details}>
                <span>Meer details</span>
              </p>
            )}
          </div>
>>>>>>> css
        </div>
        <div className={style.proj__container}>
          
          <div className={style.proj__box}>
            <span className={style.proj__theme}>{project.theme}</span>
            <span className={style.proj__status}>{project.status}</span>
          </div>
          <h2 className={style.proj__title}>{project.title}</h2>
          <div className={style.proj__boxlike}>
            <img className={style.proj__likeicon} src={icon} alt="like icon"/>
            <span className={style.proj__like}>{project.likes}</span>
            {project.participants.map(participant => (
              <span key={participant.id} >{participant.name}</span>
            ))}
          </div>
<<<<<<< HEAD
          </div>
        </Link>
      </li>
=======
        </div>
      </Link>
    </li>
>>>>>>> css
  ));
};

export default Project;
