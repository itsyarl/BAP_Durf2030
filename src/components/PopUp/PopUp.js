import React from "react";
import { useStores } from "../../hooks/useStores";
import { Link } from "react-router-dom";
import { ROUTES } from "../../consts";
import { useObserver } from "mobx-react-lite";
import { Popup } from 'react-leaflet';
import style from "../Map/Map.module.css"

const PopUp = ({project}) => {
  const { uiStore } = useStores();

  const owner = uiStore.getOwnerById(project);

  const classSwitch = (status) => {
    switch (status) {
      case 'Funding':
        return  style.bezig;
      case 'Uitvoering':
        return  style.klaar;
      case 'Voltooid':
        return  style.afgerond;
      default: return style.bezig;
    }
  }

  return useObserver(() => (
    <Popup className={style.popup}>
      <h3 className={style.title}>{project.title}</h3>
      <div className={style.info1}>
        <p className={style.theme}>{project.theme}</p>
        <div className={classSwitch(project.status)}></div>
      </div>
      <div className={style.info2}>
        <img src={owner.avatar} width="20" alt="avatar van owner" />
        <span>{project.coOwners.length}</span>
        <Link className={style.link} to={`${ROUTES.projectDetail.to}${project.id}`}>Meer details</Link>
      </div>
    </Popup>
  ));
};

export default PopUp;
