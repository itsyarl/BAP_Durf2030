import React from "react";
import { useStores } from "../../../hooks/useStores";
import { useParams } from "react-router-dom";
import MessageList from "../../../components/MessageList/MessageList";
import ChatForm from "../../../components/ChatForm/ChatForm";

const Messages = () => {
  const { id } = useParams();
  const { projectStore } = useStores();
  const project = projectStore.getProjectById(id);
  return (
    <>
      <h3>{project.title}</h3>
      <MessageList />
      <ChatForm />
    </>
  );
};

export default Messages;
