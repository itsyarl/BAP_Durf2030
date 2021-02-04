import React, { useState } from "react";
import CommentList from "../CommentList/CommentList";
import UpdateList from "../UpdateList/UpdateList";
import style from "./CommentSwitch.module.css";
import CommentForm from "../CommentForm/CommentForm";
import { useStores } from "../../hooks/useStores";

const CommentsSwitch = ({project}) => {
  const [info, setInfo] = useState("comments");

  const { uiStore } = useStores();

  return (
    <>

      <div className={style.buttons}>
          <button 
            className={`${info === 'updates' ? style.info__button__active : style.info__button }`} 
            onClick={() => setInfo('updates')}>
            Updates
          </button>
          <button 
            className={`${info === 'comments' ? style.info__button__active : style.info__button }`} 
            onClick={() => setInfo('comments')}>
            Comments
          </button>
        </div>

        <div className={style.details__posting}>
          {info === "comments" ? (
            <>
              {uiStore.currentUser.id === project.ownerId ? (
                <CommentList />
              ):(
                <>
                  <CommentForm />
                  <CommentList />
                </>
              )}
            </>
          ):(
            <>
              {uiStore.currentUser.id === project.ownerId ?(
                <>
                  <CommentForm />
                  <UpdateList />
                </>  
              ):(
                <UpdateList />
              )}
            </>
          )}
        </div>

    </>
  );
};
export default CommentsSwitch;