import React from "react";

import Comment from "../Comment/Comment";

import { useObserver } from "mobx-react-lite";
import { useStores } from "../../hooks/useStores";


const CommentList = ({project}) => {
  const { commentStore } = useStores();
  return useObserver(() => {
    if (!commentStore.comments) {
      return <p>Er zijn nog geen comments</p>;
    }
    return (
      <>
        <ul>
        {commentStore.comments ? (
          <>
            {commentStore.comments.map(comment => (
                <Comment comment={comment} key={comment.id} />
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

export default CommentList;
