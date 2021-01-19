import React from "react";
import { useParams } from "react-router-dom";
import { useStores } from "../../../hooks/useStores";
import CommentList from "../../../components/CommentList/CommentList"


const ProjectDetail = () => {
  const { id } = useParams();
  const { projectStore } = useStores();
  const project = projectStore.getProjectById(id);
  if (!project) {
    return <p>geen groep</p>;
  }
  return (
    <>
      <div>
        <section>
          <h3>{project.title}</h3>
        </section>
        <section>
          <CommentList />
        </section>
      </div>
    </>
  );
};


export default ProjectDetail;
