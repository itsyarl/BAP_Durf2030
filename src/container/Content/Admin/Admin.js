import React from "react";
import ProjectListAdmin from "../../../components/Admin/ProjectListAdmin";
import style from "./Admin.module.css"

const Admin = () => {

  return (
    <>
      <h3 className={style.title}>Project voorstellen</h3>
        <ProjectListAdmin />
    </>
  );
};

export default Admin;
