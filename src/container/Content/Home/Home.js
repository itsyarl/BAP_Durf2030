import React from "react";
import ProjectList from "../../../components/ProjectList/ProjectList"
import { Link } from "react-router-dom";
import { ROUTES } from "../../../consts";
import style from "./Home.module.css"

const Home = ({ token }) => {
  return (
    <>
      <h3>Home</h3>
      <ProjectList token={token} />
      <div className={style.test}>
        <Link to={ROUTES.addProject}>
          <span>Addproject</span>
        </Link>
        <Link to={ROUTES.acount}>
          <span>acount</span>
        </Link>
        <Link to={ROUTES.dataProject.path}>
          <span>dataProject</span>
        </Link>
        <Link to={ROUTES.editProject.path}>
          <span>editProject</span>
        </Link>
        <Link to={ROUTES.funding.path}>
          <span>funding</span>
        </Link>
        <Link to={ROUTES.guide}>
          <span>guide</span>
        </Link>
        <Link to={ROUTES.kalender}>
          <span>kalender</span>
        </Link>
      </div>
    </>
  );
};

export default Home;