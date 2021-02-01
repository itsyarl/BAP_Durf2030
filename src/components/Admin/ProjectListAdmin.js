import React from "react";
import { useStores } from "../../hooks/useStores";
import ProjectAdmin from "../Admin/ProjectAdmin";
import { useObserver } from "mobx-react-lite";

const ProjectListAdmin = () => {
  const { projectStore } = useStores();
  
  // console.log(projectStore.projects);
  return useObserver(() => (
    <>
    {/* {projectStore.projects.map(project => console.log(project))} */}
    <ul>
      {projectStore.projects.map(project => (
          <ProjectAdmin project={project} key={project.id} />
        )
      )}
    </ul>
    </>
  ));
};

export default ProjectListAdmin;


