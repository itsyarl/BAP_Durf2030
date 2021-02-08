import React from "react";

import Comment from "../Comment/Comment";

import { useObserver } from "mobx-react-lite";


const CommentList = ({project}) => {
  return useObserver(() => {
    if (!project.comments) {
      return <p>Er zijn nog geen comments</p>;
    }
    return (
      <>
        <ul>
            {project.comments.map(comment => (
                <Comment comment={comment} key={comment.id} />
            ))}
        </ul>
        
      </>
    );
  });
};

export default CommentList;
