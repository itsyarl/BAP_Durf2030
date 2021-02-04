import React from "react";
import style from "./Update.module.css";

const Update = () => {
  
  return (
      <li className={style.comment}>
        <div className={style.comment__info}>
          <p className={style.comment__user}>user name</p>
          <p className={style.comment__datum}>datum comment</p>
        </div>
        <p className={style.comment__bericht}>update test</p>
      </li>
  );
};

export default Update;
