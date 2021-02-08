import React from "react";
import ProjectListAdmin from "../../../components/Admin/ProjectListAdmin";
import style from "./Admin.module.css"

const Admin = () => {

  return (
    <section>
      <h2 className={style.title}>Project voorstellen</h2>
        <ProjectListAdmin />
    </section>
  );
};

export default Admin;
