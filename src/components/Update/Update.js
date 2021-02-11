import React from "react";
import { useStores } from "../../hooks/useStores";
import style from "./Update.module.css";

const Update = ({update}) => {

  const { uiStore, projectStore } = useStores();

  const project= projectStore.getProjectById(update.projectId)
  const owner = uiStore.getOwnerById(project);
  
  return (
      <li className={style.comment}>
        <div className={style.comment__info}>
          <p className={style.comment__user}>{owner.name}</p>
          <p className={style.comment__datum}>{update.timestamp}</p>
        </div>
        <p className={style.comment__bericht}>{update.content}</p>
      </li>
  );
};

export default Update;
