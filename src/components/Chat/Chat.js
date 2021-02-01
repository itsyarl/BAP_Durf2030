import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../consts/index";
import foto from "./foto.png";
import style from "./Chat.module.css";

const Project = ({chat}) => {

    return (
      <li>
        <Link className={style.item} to={`${ROUTES.messages.to}${chat.id}`}>
          <img src={foto} alt="groepchat icon"/>
          <div className={style.groep__info}>
            <p className={style.chat__title}>{chat.title}</p>
            <p className={style.chat__text}>
              <span className={style.chat__text__naam}>
                geen idee: 
              </span> 
              wat hier moest komen
            </p>
          </div>
        </Link>
      </li>
    );
};

export default Project;
