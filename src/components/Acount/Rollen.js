import React from "react";
import style from "./Acount.module.css";
import { Link } from "react-router-dom";
import { ROUTES } from "../../consts";
import { useStores } from "../../hooks/useStores";

const Rollen = ({ id }) => {
  const { projectStore, uiStore } = useStores();
  
  const project = projectStore.getProjectById(id);

  // setRollen(rollen.concat(rol))

  return (
          <li className={style.listitem}>
            <div className={style.listitem__content}>
              <p className={style.listitem__name}>{project.title}</p>
              <Link className={style.details__link} to={ROUTES.home}>
                <p className={style.details__link__tekst}>Bekijk project</p>
                <div className={style.driehoek}></div>
              </Link>
            </div>
            <ul className={style.listitem__content2}>
              {
                uiStore.currentUser.rollen.map(uRol => {
                  const roll = project.rollen.filter(rol => {
                    return (rol.id === uRol.id)
                  })
                  return (roll.map(rol => <li key={rol.id}>{rol.name}</li>));
                })
              }
            </ul>
          </li>
  );
};

export default Rollen;
