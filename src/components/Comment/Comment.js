import React from "react";

// import { useStores } from "../../hooks/useStores";

const Comment = ({comment}) => {
  // console.log(comment);

  return (
    <>
      <p>{comment.content}</p>
    </>
  );
};

export default Comment;
