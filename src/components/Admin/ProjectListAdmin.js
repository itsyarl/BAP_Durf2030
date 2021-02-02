import React from "react";
import { useStores } from "../../hooks/useStores";
import ProjectAdmin from "../Admin/ProjectAdmin";
import { useObserver } from "mobx-react-lite";
import style from "./Admin.module.css";

const ProjectListAdmin = () => {
  const { projectStore } = useStores();
  
  // console.log(projectStore.projects);
  return useObserver(() => (
    <>
    <ul className={style.project__list}>
      <li className={style.project__list__item}>
        <p className={style.projectinfo}>Project naam</p>
        <p className={style.projectinfo}>Gebruiker</p>
        <p className={style.projectinfo}>Bevestigen</p>
      </li>
      {projectStore.projects.map(project => (
          <ProjectAdmin project={project} key={project.id} />
        )
      )}
    </ul>
    </>
  ));
};

export default ProjectListAdmin;


