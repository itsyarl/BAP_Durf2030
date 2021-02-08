import React, { useState } from "react";
import { useObserver } from "mobx-react-lite";
import { useStores } from "../../hooks/useStores.js";
import { useParams } from "react-router-dom";
import { v4 } from "uuid";
import style from "./ChatForm.module.css";
import send from "./send.svg";

const ChatForm = () => {
  const [content, setContent] = useState("");
  const { projectStore, uiStore } = useStores();
  const { id } = useParams();

  const sendMessage = async e => {
    e.preventDefault();
    if (content !== "") {
      const contentObj = {id: v4(), content: content, user: uiStore.currentUser}
      await projectStore.sendMessage(contentObj, id);
      // await projectStore.addMessage(newMessage);
      setContent("");
    }
  };

  return useObserver(() => (
    <form onSubmit={sendMessage}>
      <article className={style.form__container}>
        <h4 className="hidden">chat venster</h4>
        <input
          className={style.input__form}
          id="content"
          name="content"
          placeholder="Typ een bericht"
          value={content}
          onChange={e => setContent(e.currentTarget.value)}
        />
        <button className={style.button__form}>
          <span role="img" aria-label="Smiley">
            <img className={style.button__form__img} src={send} alt="send icon"/>
          </span>
        </button>
      </article>
    </form>
  ));
};

export default ChatForm;
