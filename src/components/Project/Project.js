import React from "react";
import { useStores } from "../../hooks/useStores";
import { Link } from "react-router-dom";
import { ROUTES } from "../../consts";
import style from "./Project.module.css";
import { useObserver } from "mobx-react-lite";


const Project = ({project}) => {
  const { uiStore, projectStore } = useStores();

  const didLike = project.likedUsers.findIndex(user => user === uiStore.currentUser.id);
  
  const like = async e => {
    e.preventDefault();
    project.likedUsers.push(uiStore.currentUser.id);
    project.likes = project.likes + 1;
    await projectStore.addLike(project.id, uiStore.currentUser.id);
  }

  return useObserver(() => (
    <li>
      <Link to={`${ROUTES.projectDetail.to}${project.id}`}>
      <div className={style.proj__img}>
        <div className={style.proj__img__box}>
          <span>users</span>
          {uiStore.currentUser.id === project.ownerId ? (
              <button className={style.proj__details}>Edit</button>
          ) : (
            <p className={style.proj__details}>
              <span>Meer details</span>
            </p>
          )}
        </div>
      </div>
      <div className={style.proj__container}>
        
          <div className={style.proj__box}>
            <span className={style.proj__theme}>{project.theme}</span>
            <span className={style.proj__status}>{project.status}</span>
          </div>
          <h2 className={style.proj__title}>{project.title}</h2>
          <div className={style.proj__boxlike}>
            <span className={style.proj__like}>{project.likes}</span>
            {project.participants.map(participant => (
              <span key={participant.id} >{participant.name}</span>
            ))}
          </div>
      
        {didLike === -1 ? (
          <form onSubmit={like}>
            <button>
              <span>
                Like
              </span>
            </button>
          </form>
        ):(
          <span>al geliked</span>
        )}
      </div>
      </Link>
    </li>
  ));
};

export default Project;
