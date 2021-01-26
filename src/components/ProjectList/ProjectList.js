import React from "react";
import { useStores } from "../../hooks/useStores";
import Project from "../Project/Project";
import ProjectAdmin from "../Admin/ProjectAdmin";
import { useObserver } from "mobx-react-lite";

const ProjectList = () => {
  const { projectStore, uiStore } = useStores();
  
  // console.log(projectStore.projects);
  return useObserver(() => (
    <>
    {/* {projectStore.projects.map(project => console.log(project))} */}
    <ul>
    {projectStore.projects.map(project => (
      uiStore.currentUser.admin === true ? (
        <ProjectAdmin project={project} key={project.id} />
      ) : (
        <Project project={project} key={project.id}/>
      )
    ))}
    </ul>
    </>
  ));
};

export default ProjectList;