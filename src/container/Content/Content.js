import React from "react";
import { Switch, Route } from "react-router-dom";
import { ROUTES } from "../../consts";
import ProjectDetail from "./ProjectDetail/ProjectDetail.js";
import AddProject from "./AddProject/AddProject.js";
import ProjectList from "../../components/ProjectList/ProjectList"

const Content = ({ token }) => {
  return (
    <>
    <section>
      <Switch>
        <Route path={ROUTES.projectDetail.path}>
          <ProjectDetail token={token} />
        </Route>
        <Route path={ROUTES.addProject}>
          <AddProject token={token} />
        </Route>
        <Route path={ROUTES.home}>
          <ProjectList />
        </Route>
      </Switch>
    </section>
    </>
  );
};

export default Content;
