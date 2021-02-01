import React, { useState } from "react";
import { useObserver } from "mobx-react-lite";
import { useStores } from "../../hooks/useStores.js";
import { useParams } from "react-router-dom";
import { v4 } from "uuid";

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
      <section>
        <button>
          <span role="img" aria-label="Smiley">
            😃
          </span>
        </button>
        <input
          id="content"
          name="content"
          placeholder="Typ een bericht"
          value={content}
          onChange={e => setContent(e.currentTarget.value)}
        />
      </section>
    </form>
  ));
};

export default ChatForm;
