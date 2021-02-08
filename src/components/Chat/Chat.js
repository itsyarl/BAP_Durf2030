import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../consts/index";
import foto from "./foto.png";
import style from "./Chat.module.css";
// import { useStores } from "../../hooks/useStores";

const Project = ({chat}) => {

  // const { projectStore } = useStores();

  return (
    <li>
      <Link className={style.item} to={`${ROUTES.messages.to}${chat.id}`}>
        <img src={foto} alt="groepchat icon"/>
        <div className={style.groep__info}>
          <p className={style.chat__title}>{chat.title}</p>
          <p className={style.chat__text}>
            <span className={style.chat__text__naam}>
              {/* {chat.messages[chat.messages.length-1].name} */}
              {/* {console.log(chat)} */}
              weet niet:
            </span> 
            hoe ik hier de laatste message krijg
          </p>
        </div>
      </Link>
    </li>
  );
};

export default Project;
