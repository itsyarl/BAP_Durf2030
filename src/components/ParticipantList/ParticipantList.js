import React from "react";
import { useObserver } from "mobx-react-lite";
import { useStores } from "../../hooks/useStores";
import style from "./ParticipantList.module.css";

const ParticipantList = ({ project }) => {
  const { projectStore, uiStore } = useStores();

  const handleFormSubmit = async e => {
    e.preventDefault();
    project.participants.push(uiStore.currentUser);
    projectStore.chats.push(project);
    await projectStore.addParticipantToProject(project.id);
  }

  return useObserver(() => {
    const inProject = project.participants.findIndex(item => item.id === uiStore.currentUser.id);
    if (!project.participants) {
      return <p>Er zijn nog geen comments</p>;
    }
    return ( 
      <>
        { inProject === -1 ? ( 
          <>
            <form onSubmit={handleFormSubmit}>
              <button className={style.join}>
                <span>
                  Ik doe mee
                </span>
              </button>
            </form>
          </>
        ):(
          <span className={style.text}>Al in project</span>
        )}
      </>
    );
  });
};

export default ParticipantList;
