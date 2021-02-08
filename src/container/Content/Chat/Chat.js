import React from "react";
import ChatList from "../../../components/ChatList/ChatList";
import { useObserver } from "mobx-react-lite";
import style from "./Chat.module.css";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../consts";
import { useStores } from "../../../hooks/useStores";

const Chat = () => {

  const { projectStore } =  useStores();

  //emptyMessages
  projectStore.emptyMessage();

  return useObserver(() => (
    <div className={style.container}>
      <h3 className={style.title}>Chat groepen</h3>
      <ChatList />
      <Link className={style.link} to={ROUTES.home}>Bekijk andere projecten</Link>
    </div>
  ));
};

export default Chat;