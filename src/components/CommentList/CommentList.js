import React from "react";

import Comment from "../Comment/Comment";
import CommentForm from "../CommentForm/CommentForm";

import { useObserver } from "mobx-react-lite";
import { useStores } from "../../hooks/useStores";


const CommentList = () => {
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
            <h3>comments</h3>
            {commentStore.comments.map(comment => (
              <Comment comment={comment} key={comment.id} />
            ))}
          </>
        ) : (
          <span>loading</span>
        )}
        </ul>
        <CommentForm />
      </>
    );
  });
};

export default CommentList;
