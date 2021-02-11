import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../consts/index";
import style from "./Chat.module.css";

const Project = ({chat}) => {

  return (
    <li>
      <Link className={style.item} to={`${ROUTES.messages.to}${chat.id}`}>
        <img className={style.image} src={chat.image.url} width="50" height="50" alt="groepchat icon"/>
        <div className={style.groep__info}>
          <p className={style.chat__title}>{chat.title}</p>
        </div>
      </Link>
    </li>
  );
};

export default Project;
