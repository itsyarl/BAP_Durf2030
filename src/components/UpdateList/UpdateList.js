import React from "react";

import Update from "../Update/Update";

import { useObserver } from "mobx-react-lite";
import { useStores } from "../../hooks/useStores";


const UpdateList = () => {
  const { commentStore } = useStores();
  return useObserver(() => {
    if (!commentStore.updates) {
      return <p>Er zijn nog geen comments</p>;
    }
    return (
      <>
        <ul>
        {commentStore.updates ? (
          <>
            {commentStore.updates.map(comment => (
             <Update key={comment.id}/>
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
