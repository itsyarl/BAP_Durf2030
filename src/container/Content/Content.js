import React from "react";
import { Switch, Route } from "react-router-dom";
import { ROUTES } from "../../consts";
import ProjectDetail from "./ProjectDetail/ProjectDetail.js";
import AddProject from "./AddProject/AddProject.js";
import ProjectList from "../../components/ProjectList/ProjectList"
import { useStores } from "../../hooks/useStores";
import Admin from "./Admin/Admin.js";

const Content = ({ token }) => {
  const { uiStore } = useStores();
  return (
    <>
    <section>
      <Switch>
        <Route path={ROUTES.projectDetail.path}>
          <ProjectDetail token={token} />
        </Route>

        <Route path={ROUTES.addProject}>
          <AddProject />
        </Route>

        <Route path={ROUTES.home}>
          {uiStore.currentUser.admin === true ? (
            <Admin />
          ) : (
            <ProjectList token={token} />
          )}
        </Route>
      </Switch>
    </section>
    </>
  );
};

export default Content;
