import React from "react";
import { useStores } from "../../hooks/useStores";
import Project from "../../components/Project/Project"
import { useObserver } from "mobx-react-lite";

const ProjectList = () => {
  const { projectStore } = useStores();
  // console.log(projectStore.projects);
  return useObserver(() => (
    <>
    {/* {projectStore.projects.map(project => console.log(project))} */}
    <ul>
    {projectStore.projects.map(project => (
      <Project project={project} key={project.id}/>
    ))}
    </ul>
    </>
  ));
};

export default ProjectList;