import React, { useState } from "react";
import { useObserver } from "mobx-react-lite";
import Comment from "../../models/Comment";
import { useStores } from "../../hooks/useStores";
import { useParams } from "react-router-dom";

const CommentForm = () => {
  const [content, setContent] = useState("");
  const { uiStore, commentStore } = useStores();
  const { id } = useParams();

  const handleFormSubmit = async e => {
    e.preventDefault();
    if (content !== "") {
      const newComment = new Comment({
        projectId: id,
        content,
        userId: uiStore.currentUser.id,
        from: uiStore.currentUser.name
      });
      await commentStore.createComment(newComment);
      await commentStore.addComments(newComment);
      setContent("");
    }
  };

  return useObserver(() => (
    <form onSubmit={handleFormSubmit}>
      <section>
        <input
            id="content"
            name="content"
            placeholder="Typ een bericht"
            value={content}
            onChange={e => setContent(e.currentTarget.value)}
          />
        <button>
          <span role="img" aria-label="Smiley">
            verzend
          </span>
        </button>
      </section>
    </form>
  ));
};

export default CommentForm;
