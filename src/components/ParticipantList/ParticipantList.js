import React from "react";
import { useObserver } from "mobx-react-lite";
import { useStores } from "../../hooks/useStores";
import style from "./ParticipantList.module.css";

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
        { inProject === -1 ? ( 
          <>
            <form onSubmit={handleFormSubmit}>
              <button className={style.join}>
                <span>
                  Join project
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
