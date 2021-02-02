import React from "react";
import style from "./Comment.module.css";

const Comment = ({comment}) => {

  return (
    <li className={style.comment}>
      <div className={style.comment__info}>
        <p className={style.comment__user}>user name</p>
        <p className={style.comment__datum}>datum comment</p>
      </div>
      <p className={style.comment__bericht}>{comment.content}</p>
    </li>
  );
};

export default Comment;