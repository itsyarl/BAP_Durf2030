import React from "react";
import ProjectList from "../../../components/ProjectList/ProjectList";
// import { useStores } from "../../../hooks/useStores";

const Admin = () => {
  // const { uiStore } = useStores();

  return (
    <>
      <h3>admin</h3>
      <section>
        <ProjectList />
      </section>
    </>
  );
};


export default Admin;
