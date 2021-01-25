import React from "react";
import { useParams } from "react-router-dom";
import { Image } from 'cloudinary-react'
import { useStores } from "../../../hooks/useStores";
import CommentList from "../../../components/CommentList/CommentList"
import ParticipantList from "../../../components/ParticipantList/ParticipantList";
import style from "./ProjectDetail.module.css"

const ProjectDetail = () => {
  const { id } = useParams();
  const { projectStore} = useStores();
  const project = projectStore.getProjectById(id);

  if (!project) {
    return <p>geen groep</p>;
  }

  return (
    <>
      <div className={style.test}>
        <section>
          <h3>{project.title}</h3>
          <Image publicId="" />
        </section>
        <section>
          <ParticipantList project={project} />
        </section>
        <section>
          <CommentList />
        </section>
      </div>
    </>
  );
};


export default ProjectDetail;
