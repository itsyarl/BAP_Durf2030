import React from "react";
import { useObserver } from "mobx-react-lite";
import { useStores } from "../../hooks/useStores";
import Chat from "../Chat/Chat";
import style from "./ChatList.module.css";


const ChatList = () => {
  const { projectStore } = useStores();
  return useObserver(() => {
    if (!projectStore.chats) {
      return <p>Je werkt nog niet mee aan een project.</p>;
    }
    return (
      <ul className={style.itemlist}>
        {projectStore.chats.map(chat =>(
          <Chat key={chat.id} chat={chat} />
        ))}
      </ul>
    );
  });
};

export default ChatList;