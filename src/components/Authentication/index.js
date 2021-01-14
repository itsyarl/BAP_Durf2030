import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ROUTES } from "../../consts";
import style from "./Authentication.module.css";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useStores } from "../../hooks/useStores";
import { useObserver } from "mobx-react-lite";

import Sidebar from "../../container/Navigatie/SideNav/Sidebar.js"
import Content from "../../container/Content/Content";

const Authentication = () => {
  const { uiStore } = useStores();
  return useObserver(() => (
    <>
      <Switch>
        <Route exact path={ROUTES.login}>
          {uiStore.currentUser ? (
            <Redirect to={ROUTES.home} />
          ) : (
            <div className={style.wrapper}>
              <LoginForm />
            </div>
          )}
        </Route>
        <Route exact path={ROUTES.register}>
          {uiStore.currentUser ? (
            <Redirect to={ROUTES.home} />
          ) : (
            <div className={style.wrapper}>
              <RegisterForm />
            </div>
          )}
        </Route>
        <Route path={ROUTES.home}>
          {uiStore.currentUser ? (
            <>
              <Sidebar />
              <Content />
            </>
          ) : (
            <Redirect to={ROUTES.login} />
          )}
        </Route>
      </Switch>
    </>
  ));
};

export default Authentication;
