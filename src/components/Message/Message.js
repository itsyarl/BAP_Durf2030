import React from "react";
import PropTypes from "prop-types";
import { useObserver } from "mobx-react-lite";
import style from "./Message.module.css";
import { useStores } from "../../hooks/useStores";

const Message = ({ message, project }) => {
  const { uiStore } = useStores();
  return useObserver(() => (
    <>
      {message.messages.map(messageObj => ( 
        <li key={messageObj.id} className={`${style.item} ${uiStore.currentUser.name === messageObj.user.name ? style.item__me : ""}`}>
        <img width="30" className={`${style.img} ${uiStore.currentUser.name === messageObj.user.name ? style.img__me : ""}`} src={messageObj.user.avatar} alt="user foto"/> 
          <div className={`${style.content} ${uiStore.currentUser.name === messageObj.user.name ? style.content__me : ""}`}>
            <p className={`${style.user} ${uiStore.currentUser.name === messageObj.user.name ? style.user__me : ""}`}>{messageObj.user.name} <span className={style.user__rol}></span></p>
            <p className={`${style.text} ${project.ownerId === messageObj.user.id ? style.text__owner : ""} ${uiStore.currentUser.name === messageObj.user.name ? style.text__me : ""}`}>{messageObj.content}</p>
          </div>
        </li>
      ))}
    </>
  ));
};

Message.propTypes = {
  message: PropTypes.object.isRequired
};

export default Message;
