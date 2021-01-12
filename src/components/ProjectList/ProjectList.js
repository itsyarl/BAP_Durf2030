import { useObserver } from "mobx-react-lite";
import React from "react";
import { useStores } from "../../hooks/useStores";

const ProjectList = ({project}) => {
  const { uiStore } = useStores();
  console.log(uiStore.currentUser);
  return useObserver(() => (
    <>
      {uiStore.currentUser.id === project.ownerId ? (
          <button>Edit</button>
      ) : (
          <span>Meer details</span>
      )}
      <div>
        <span>{project.theme}</span>
        <span>{project.status}</span>
      </div>
      <h2>{project.title}</h2>
      <div>
        <span>{project.likes}</span>
        {/* <span>{project.comments.math()}</span> */}
      </div>
    </>
  ));
};

export default ProjectList;
