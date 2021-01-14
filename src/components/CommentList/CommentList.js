import React, { useEffect, useState }from "react";

import Comment from "../Comment/Comment";
import CommentForm from "../CommentForm/CommentForm";

import { useObserver } from "mobx-react-lite";
import { useStores } from "../../hooks/useStores";
import { useParams } from "react-router-dom";


const CommentList = () => {
  const { id } = useParams();
  const { projectStore, commentStore } = useStores();
  const project = projectStore.getProjectById(id);
  const [comments, setComments] = useState();

  useEffect(() => {
    const getComments = async () => {
      const comments = await commentStore.getCommentsByProjectId(id);
      // console.log(comments);
      setComments(comments);
    }
    getComments();
  }, [commentStore, id])

  // console.log(commentStore.comments);
  return useObserver(() => {
    // if (!project) {
    //   return <Empty message={"Conversation not found"} />;
    // }
    return (
      <>
        <header>
          {project && (
            <>
              <h3>{project.name}</h3>
            </>
          )}
        </header>
        <ul>
        {commentStore.comments ? (
          // <span>comments</span>
          commentStore.comments.map(comment => (
            <Comment comment={comment} key={comment.id} />
          ))
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
