import React from "react";
import { useStores } from "../../hooks/useStores";
import { Link } from "react-router-dom";
import { ROUTES } from "../../consts";
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
        {uiStore.currentUser.id === project.ownerId ? (
            <button>Edit</button>
        ) : (
          <Link to={`${ROUTES.projectDetail.to}${project.id}`}>
            <span>Meer details</span>
          </Link>
        )}
        <Link to={`${ROUTES.projectDetail.to}${project.id}`}>
          <div>
            <span>{project.theme}</span>
            <span>{project.status}</span>
          </div>
        <h2>{project.title}</h2>
          <div>
            <span>{project.likes}</span>
            {project.participants.map(participant => (
              <span key={participant.id} >{participant.name}</span>
            ))}
          </div>
        </Link>
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
      </li>
  ));
};

export default Project;
