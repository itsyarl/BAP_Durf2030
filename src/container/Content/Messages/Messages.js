import React from "react";
import { useStores } from "../../../hooks/useStores";
import { useParams } from "react-router-dom";
import MessageList from "../../../components/MessageList/MessageList";
import ChatForm from "../../../components/ChatForm/ChatForm";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../consts";
import style from "./Messages.module.css";

const Messages = () => {
  const { id } = useParams();
  const { projectStore } = useStores();
  const project = projectStore.getProjectById(id);
  return (
    <div className={style.chat__grid}>
      <div className={style.chat__box}>
        <Link className={style.details__link} to={ROUTES.home}>
          <div className={style.driehoek}></div>
          <p className={style.details__link__tekst}>Terug naar projecten</p>
        </Link>
        <h3 className={style.messeage__title}>{project.title}</h3>
        <MessageList project={project}/>
        <ChatForm />
      </div>

      <div className={style.info__content}>
        <h3 className={style.info__title}>Info:</h3>
        <p className={style.info__text}>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
        </p>

        <h3 className={style.info__title}>Eigenaar</h3>
        <ul className={style.info__eigenaarlist}>
          <li className={style.list__item}>Eleanor Pena</li>
        </ul>

        <h3 className={style.info__title}>Leden</h3>
        <ul className={style.info__deelnemerslist}>
          <li className={style.list__item}>Darrell Steward</li>
          <li className={style.list__item}>Theresa Webb</li>
          <li className={style.list__item}>Savannah Nguyen</li>
          <li className={style.list__item}>Bessie Cooper</li>
        </ul>
      </div>
    </div>
  );
};

export default Messages;
