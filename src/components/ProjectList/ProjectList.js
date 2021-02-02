import React from "react";
import { useStores } from "../../hooks/useStores";
import Project from "../Project/Project";
import ProjectAdmin from "../Admin/ProjectAdmin";
import { useObserver } from "mobx-react-lite";
import style from  "./ProjectList.module.css";

const ProjectList = () => {
  const { projectStore, uiStore } = useStores();
  
  // console.log(projectStore.projects);
  return useObserver(() => (
    <>
    {/* {projectStore.projects.map(project => console.log(project))} */}
    <ul className={style.list}>
        {uiStore.currentUser.admin === true ? (
          projectStore.projects.map(project => (          
            <ProjectAdmin project={project} key={project.id} />
          ))
        ) : (
          projectStore.projects.map(project => (
            <Project project={project} key={project.id}/>
            // console.log(project)
          ))
      )}
    </ul>
    </>
  ));
};

export default ProjectList;


