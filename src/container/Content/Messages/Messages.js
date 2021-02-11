import React, { useEffect, useState } from "react";
import { useStores } from "../../../hooks/useStores";
import { useParams } from "react-router-dom";
import MessageList from "../../../components/MessageList/MessageList";
import ChatForm from "../../../components/ChatForm/ChatForm";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../consts";
import style from "./Messages.module.css";
import load from "./Loadinggif.gif";

const Messages = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true)
  const { projectStore } = useStores();
  const project = projectStore.getProjectById(id);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500)
  }, [])
  
  return (
    loading === false ? (
      <section className={style.chat__grid}>
        <h2 className="hidden">chat</h2>
        <article className={style.chat__box}>
          <Link className={style.details__link} to={ROUTES.chat}>
            <div className={style.driehoek}></div>
            <p className={style.details__link__tekst}>Terug naar chatgroepen</p>
          </Link>
          <h3 className={style.messeage__title}>{project.title}</h3>
          <MessageList project={project}/>
          <ChatForm />
        </article>

        <article className={style.info__content}>
          <h3 className={style.info__title}>Info:</h3>
          <p className={style.info__text}>
            {project.description}
          </p>

          <h4 className={style.info__title}>Eigenaar</h4>
          <ul className={style.info__eigenaarlist}>
            <li className={style.list__item}>{project.ownerName}</li>
          </ul>

          <h4 className={style.info__title}>Leden</h4>
          <ul className={style.info__deelnemerslist}>
            {project.participants.map(participant => (
            <li key={participant.id} className={style.list__item}>{participant.name}</li>
            ))}
          </ul>
        </article>
      </section>
    ):(
      <img width="800"src={load} alt="rollen icon"/>
    )
  );
};

export default Messages;
