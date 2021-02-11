import React, { useState } from "react";
import { useStores } from "../../hooks/useStores.js";
import { useParams } from "react-router-dom";
import { v4 } from "uuid";
import style from "./ChatForm.module.css";
import send from "./send.svg";
import { useObserver } from "mobx-react-lite";

const ChatForm = () => {
  const { id } = useParams();

  const [content, setContent] = useState("");
  const { projectStore, uiStore } = useStores();



  const sendMessage = async e => {
    e.preventDefault();
    if (content !== "") {
      const user = uiStore.currentUser;
      delete user.rollen
      const contentObj = {id: v4(), content: content, user: user}
      await projectStore.sendMessage(contentObj, id);
      setContent("");
    }
  };

  return useObserver(() => (
    <form onSubmit={e => sendMessage(e)}>
      <article className={style.form__container}>
        <h4 className="hidden">chat venster</h4>
        <input
          className={style.input__form}
          type="text"
          id="content"
          name="content"
          placeholder="Typ een bericht"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <button className={style.button__form}>
          <img className={style.button__form__img} src={send} alt="send icon"/>
        </button>
      </article>
    </form>
  ));
};

export default ChatForm;
