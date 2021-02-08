import { useObserver } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { useStores } from "../../hooks/useStores";
import Message from "../../models/Message";
import style from "./Admin.module.css";

const ProjectAdmin = ({project}) => {
  const { projectStore } = useStores();

  const handleApprove = async e => {
    e.preventDefault();
    project.validated = true;
    //chatDocument maken
    const newChat = new Message({
      projectId: project.id,
    });
    await projectStore.createChatDocument(newChat);
    await projectStore.approveProject(project.id);
  };

  return useObserver(() => (
    <li className={style.project__list__item}>
      <h4 className={style.project__title}>{project.title}</h4>
      <p>user name</p>
      {project.validated === false ? (
        <button onClick={handleApprove}>
          Approve
        </button>
      ):(
        <span>Is al goedgekeurd</span>
      )}
      <Link className={style.project__detail__link}>Bekijk project</Link>
    </li>
  ));
};

export default ProjectAdmin;
