import React, { useState } from "react";
import { useObserver } from "mobx-react-lite";
import Comment from "../../models/Comment";
import { useStores } from "../../hooks/useStores";
import style from "./CommentForm.module.css"

const CommentForm = ({project}) => {
  const [content, setContent] = useState("");
  const { uiStore, commentStore } = useStores();

  const handleFormSubmit = async e => {
    e.preventDefault();
    if (content !== "") {
      if(uiStore.currentUser.id === project.ownerId){

      }


      const newComment = new Comment({
        projectId: project.id,
        content,
        userId: uiStore.currentUser.id,
        from: uiStore.currentUser.name
      });
      await commentStore.createComment(newComment, project);
      await commentStore.addComments(newComment, project);
      setContent("");
    }
  };

  return useObserver(() => (
    <form onSubmit={handleFormSubmit}>
      <div>
        <textarea
          className={style.textarea__comment}
          id="content"
          name="content"
          placeholder="Typ een bericht"
          value={content}
          max="300"
          onChange={e => setContent(e.currentTarget.value)}
        />
        <button className={style.button__comment}>
          <span role="img" aria-label="Smiley">
            verzend
          </span>
        </button>
      </div>
    </form>
  ));
};

export default CommentForm;
