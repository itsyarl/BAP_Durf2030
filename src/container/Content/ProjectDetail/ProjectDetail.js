import React from "react";
import { useParams } from "react-router-dom";
import { useStores } from "../../../hooks/useStores";
import CommentList from "../../../components/CommentList/CommentList"


const ProjectDetail = () => {
  const { id } = useParams();
  const { projectStore } = useStores();
  const project = projectStore.getProjectById(id);

  const handleFormSubmit = async e => {
    e.preventDefault();
    await projectStore.addParticipantToProject(id);
    }

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
          <ul>
            {project.participants.map(participant =>(
              <li key={participant.id} >{participant.email}</li>
            ))}
          </ul>
          
          <form onSubmit={handleFormSubmit}>
            <button>
              <span>
                Join project
              </span>
            </button>
          </form>
        
        </section>
        <section>
          <CommentList />
        </section>
      </div>
    </>
  );
};


export default ProjectDetail;
