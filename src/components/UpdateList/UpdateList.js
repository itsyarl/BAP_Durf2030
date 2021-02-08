import React from "react";

import Update from "../Update/Update";

import { useObserver } from "mobx-react-lite";

const UpdateList = ({project}) => {
  return useObserver(() => {
    if (!project.updates) {
      return <p>Er zijn nog geen comments</p>;
    }
    return (
      <>
        <ul>
        {project.updates ? (
          <>
            {project.updates.map(comment => (
             <Update key={comment.id} update={comment} />
            ))}
          </>
        ) : (
          <span>loading</span>
        )}
        </ul>
        
      </>
    );
  });
};

export default UpdateList;
