import React from "react";
import { useObserver } from "mobx-react-lite";
import { useStores } from "../../../hooks/useStores";
import Project from "../../../components/Project/Project";
import style from  "../../../components/ProjectList/ProjectList.module.css";


// import style from "./Home.module.css"

const InDeKijker = ({ token }) => {

  const { projectStore } = useStores();

  return useObserver(() => (
    <section>
          <h2>In de kijker</h2>
          <ul className={style.list}>
            {projectStore.projects.map(project => {
              if (project.spotlight === true) 
                return <Project key={project.id} project={project} />
              return null;
            })}
          </ul>
    </section>
  ));
};

export default InDeKijker;