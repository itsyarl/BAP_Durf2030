import React from "react";
import { useParams } from "react-router-dom";
import { Image } from 'cloudinary-react'
import { useStores } from "../../../hooks/useStores";
import CommentList from "../../../components/CommentList/CommentList"
import ParticipantList from "../../../components/ParticipantList/ParticipantList";
import style from "./ProjectDetail.module.css"
import { useObserver } from "mobx-react-lite";

const ProjectDetail = () => {
  const { id } = useParams();
  const { projectStore, uiStore } = useStores();
  const project = projectStore.getProjectById(id);
  const didLike = project.likedUsers.findIndex(user => user === uiStore.currentUser.id);
  
  const like = async e => {
    e.preventDefault();
    project.likedUsers.push(uiStore.currentUser.id);
    project.likes = project.likes + 1;
    await projectStore.addLike(project.id, uiStore.currentUser.id);
  }
  return useObserver(() => {

    if (!project) {
      return <p>geen groep</p>;
    }

    return(
      <>
        <div className={style.test}>
          <section>
            <h3>{project.title}</h3>
            <Image width="300" publicId={project.image.public_id} />
          </section>
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
          <span>{project.likes}</span>
          <section>
            <ParticipantList project={project} />
          </section>
          <section>
            <CommentList />
          </section>
        </div>
      </>
    );
  });
};

export default ProjectDetail;
