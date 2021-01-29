import React from "react";
import ChatList from "../../../components/ChatList/ChatList";
import { useObserver } from "mobx-react-lite";

const Chat = () => {
  return useObserver(() => (
    <>
    <h3>Chat</h3>
      <ul className="groups">
        <ChatList />
      </ul>
    </>
  ));
};

export default Chat;