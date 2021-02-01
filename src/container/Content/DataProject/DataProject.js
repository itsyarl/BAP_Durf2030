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
      <ul>
        {project.rollen.map(rol => (
          <>
            <li>{rol.rol} -- {rol.aantal}</li>
            <button>Geef een rol</button>
          </>
        ))}
      </ul>
    </>
  );
};

export default DataProject;
