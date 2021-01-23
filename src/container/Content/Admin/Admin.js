import React from "react";
import ProjectList from "../../../components/ProjectList/ProjectList";
import style from "./Admin.module.css"

const Admin = () => {

  return (
    <>
      <h3 className={style.test}>admin</h3>
      <section>
        <ProjectList />
      </section>
    </>
  );
};

export default Admin;
