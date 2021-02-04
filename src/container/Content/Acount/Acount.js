import React from "react";
import { useStores } from "../../../hooks/useStores";
import Project from "../../../components/Project/Project";
import style from "./Acount.module.css"

const Acount = () => {

  const { projectStore, uiStore } = useStores();

  return (
    <>
      <h3 className={style.test}>acount</h3>
      <ul>
        {projectStore.projects.map( project => (
          project.ownerId === uiStore.currentUser.id ? (
            <Project key={project.id} project={project} />
          ) : (
            <></>
          )

        ))}
      </ul>
    </>
  );
};

export default Acount;
