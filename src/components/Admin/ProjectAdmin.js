import React from "react";
import { useStores } from "../../hooks/useStores";

const ProjectAdmin = ({project}) => {
  const { projectStore } = useStores();

  const handleApprove = async e => {
    e.preventDefault();
    // const projectRef = await projectStore.getProjectById();
    await projectStore.approveProject(project.id);
  };

  return(
    <li>
      <h2>{project.title}</h2>
      <p>{project.creatorName}</p>
      <button onClick={handleApprove}>
        Approve
      </button>
    </li>
  );
};

export default ProjectAdmin;
