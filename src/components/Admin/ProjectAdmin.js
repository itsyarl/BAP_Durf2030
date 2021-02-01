import { useObserver } from "mobx-react-lite";
import React from "react";
import { useStores } from "../../hooks/useStores";
import Message from "../../models/Message";

const ProjectAdmin = ({project}) => {
  const { projectStore } = useStores();

  const handleApprove = async e => {
    e.preventDefault();
    project.validated = true;
    //chatDocument maken
    const newChat = new Message({
      projectId: project.id,
    });
    await projectStore.createChatDocument(newChat);
    await projectStore.approveProject(project.id);
  };

  return useObserver(() => (
    <li>
      <h2>{project.title}</h2>
      <p>{project.creatorName}</p>
      {project.validated === false ? (
        <button onClick={handleApprove}>
          Approve
        </button>
      ):(
        <span>is al goedgekeurd</span>
      )}
    </li>
  ));
};

export default ProjectAdmin;
