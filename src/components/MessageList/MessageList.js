import React from "react";
import Message from "../Message/Message";
import { useObserver } from "mobx-react-lite";
import { useStores } from "../../hooks/useStores";
import style from "./MessageList.module.css";

const MessageList = ({project}) => {
  const { projectStore } = useStores();
  return useObserver(() => {
    if (!projectStore.messages) {
      return (<p>Er zijn nog geen berichten</p>);
    }
    return (
      <ul className={style.list}>
         {projectStore.messages ? (
          <>
            {projectStore.messages.map(message => (
                // console.log(message)
                <Message project={project} message={message} key={message.id} />
            ))}
          </>
        ) : (
          <span>loading</span>
        )}
      </ul>
    );
  });
};

export default MessageList;