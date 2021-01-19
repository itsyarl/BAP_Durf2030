import React, { useEffect }from "react";

import Comment from "../Comment/Comment";
import CommentForm from "../CommentForm/CommentForm";

import { useObserver } from "mobx-react-lite";
import { useStores } from "../../hooks/useStores";
import { useParams } from "react-router-dom";


const CommentList = () => {
  const { id } = useParams();
  const { commentStore } = useStores();
  // const project = projectStore.getProjectById(id);

  useEffect(() => {
    const getComments = async () => {
      await commentStore.getCommentsByProjectId(id);
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
