import React from "react";
import { useStores } from "../../hooks/useStores";
import ProjectList from "../../components/ProjectList/ProjectList"
import { useObserver } from "mobx-react-lite";

const Home = () => {
  const { projectStore } = useStores();
  return useObserver(() => (
    <>
      {projectStore.projects.map(project => (
        <>
          <article>
            <ProjectList project={project} />
          </article>
        </>
      ))}
    </>
  ))
};

export default Home;