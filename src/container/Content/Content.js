import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { ROUTES } from "../../consts";
import ProjectDetail from "./ProjectDetail/ProjectDetail";
import AddProject from "./AddProject/AddProject";
import ProjectList from "../../components/ProjectList/ProjectList"
import { useStores } from "../../hooks/useStores";
import Admin from "./Admin/Admin";

const Content = ({ token }) => {
  const { uiStore } = useStores();
  return (
    <>
      <section>
        <Switch>
          <Route exact path={ROUTES.addProject}>
            <AddProject />
          </Route>

          <Route path={ROUTES.projectDetail.path}>
            <ProjectDetail token={token} />
          </Route>

          <Route exact strict path={ROUTES.home}>
            {uiStore.currentUser.admin === true ? (
              <Admin />
            ) : (
              <>
                <ProjectList token={token} />
                <Link to={ROUTES.addProject}>
                  <span>Addproject</span>
                </Link>
              </>
            )}
          </Route>
        </Switch>
      </section>
    </>
  );
};

export default Content;
