import React from "react";
import style from "./Update.module.css";

const Update = ({update}) => {
  
  return (
      <li className={style.comment}>
        <div className={style.comment__info}>
          <p className={style.comment__user}>{update.user}</p>
          <p className={style.comment__datum}>{update.timestamp}</p>
        </div>
        <p className={style.comment__bericht}>{update.content}</p>
      </li>
  );
};

export default Update;
