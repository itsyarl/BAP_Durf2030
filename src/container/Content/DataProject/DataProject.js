import React from "react";
import { useParams } from "react-router-dom";
import { useStores } from "../../../hooks/useStores";
import style from "./DataProject.module.css"

const DataProject = () => {
  const { id } = useParams();
  const { projectStore } = useStores();
  const project = projectStore.getProjectById(id);

  return (
    <>
      <h3 className={style.test}>DataProject</h3>
      <h6>{project.title}</h6>
    </>
  );
};

export default DataProject;
