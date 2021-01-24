import React from "react";

// import Comment from "../Comment/Comment";
// import CommentForm from "../CommentForm/CommentForm";

import { useObserver } from "mobx-react-lite";
import { useStores } from "../../hooks/useStores";
import Participant from "../Participant/Participant";


const ParticipantList = ({ project }) => {
  const { projectStore, uiStore } = useStores();

  const handleFormSubmit = async e => {
    e.preventDefault();
    project.participants.push(uiStore.currentUser);
    await projectStore.addParticipantToProject(project.id);
  }

  const inProject = project.participants.findIndex(item => item.id === uiStore.currentUser.id);

  return useObserver(() => {
    if (!project.participants) {
      return <p>Er zijn nog geen comments</p>;
    }
    return (
      <>
        <ul>
        {project.participants.map(participant =>(
          <Participant key={participant.id} participant={participant} />
        ))}
        </ul>

        { inProject === -1 ? ( 
          <>
            <form onSubmit={handleFormSubmit}>
              <button>
                <span>
                  Join project
                </span>
              </button>
            </form>
          </>
        ):(
          <span>Je zit al in dit project</span>
        )}
      </>
    );
  });
};

export default ParticipantList;
