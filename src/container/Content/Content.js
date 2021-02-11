import React from "react";
import { Switch, Route } from "react-router-dom";
import { ROUTES } from "../../consts";
import ProjectDetail from "./ProjectDetail/ProjectDetail";
import AddProject from "./AddProject/AddProject";
import { useStores } from "../../hooks/useStores";
import Admin from "./Admin/Admin";
import Home from "./Home/Home";
import Acount from "./Acount/Acount";
import DataProject from "./DataProject/DataProject";
import EditProject from "./EditProject/EditProject";
import Funding from "./Funding/Funding";
import Guide from "./Guide/Guide";
import Chat from "./Chat/Chat";
import style from "./Content.module.css";
import Messages from "./Messages/Messages";
import Contact from "./Contact/Contact";
import InDeKijker from "./InDeKijker/InDeKijker";

const Content = ({ token }) => {
  const { uiStore } = useStores();
  return (
    <main className={style.content}>
      <Switch>
        <Route path={ROUTES.addProject}>
          <AddProject />
        </Route>

        <Route path={ROUTES.guide}>
          <Guide />
        </Route>

        <Route path={ROUTES.account}>
          <Acount />
        </Route>

        <Route path={ROUTES.contact}>
          <Contact />
        </Route>

        <Route path={ROUTES.dataProject.path}>
          <DataProject />
        </Route>

        <Route path={ROUTES.editProject.path}>
          <EditProject />
        </Route>

        <Route path={ROUTES.funding.path}>
          <Funding />
        </Route>
        
        <Route path={ROUTES.projectDetail.path}>
          <ProjectDetail token={token} />
        </Route>

        <Route path={ROUTES.inDeKijker}>
          <InDeKijker token={token} />
        </Route>

        <Route exact strict path={ROUTES.home}>
          {uiStore.currentUser.admin === true ? (
            <Admin />
          ) : (
            <Home/>
          )}
        </Route>

        <Route exact strict path={ROUTES.chat}>
          <Chat />
        </Route>

        <Route exact strict path={ROUTES.messages.path}>
          <Messages />
        </Route>

      </Switch>
    </main>
  );
};

export default Content;
