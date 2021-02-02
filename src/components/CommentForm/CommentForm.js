import React, { useState } from "react";
import { useObserver } from "mobx-react-lite";
import Comment from "../../models/Comment";
import { useStores } from "../../hooks/useStores";
import { useParams } from "react-router-dom";
import style from "./CommentForm.module.css"

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
        <textarea
          className={style.textarea__comment}
          id="content"
          name="content"
          placeholder="Typ een bericht"
          value={content}
          onChange={e => setContent(e.currentTarget.value)}
        />
        <button className={style.button__comment}>
          <span role="img" aria-label="Smiley">
            verzend
          </span>
        </button>
      </section>
    </form>
  ));
};

export default CommentForm;
