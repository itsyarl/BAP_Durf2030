import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ROUTES } from "../../consts";
import style from "./Authentication.module.css";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useStores } from "../../hooks/useStores";
import { useObserver } from "mobx-react-lite";

import Content from "../../container/Content/Content";
import SideNav from "../../container/Navigatie/SideNav/Sidebar";
import TopNav from "../../container/Navigatie/TopNav/Topbar";
import { Cookies, withCookies } from "react-cookie";

const Authentication = () => {
  const { userStore, uiStore } = useStores();

  const cookies = new Cookies();
  const userToken = cookies.get("userToken");
  const userRef = cookies.get("userRef");
  // const [state, setState] = useState("");

  useEffect(() => {
    const getUserState = async () => {
      const state = await userStore.checkLoggedIn(userToken);
      if(state === true){
        await uiStore.getUserByDocument(userRef);
      }
    }
      getUserState();
  }, [userStore, userToken, uiStore, userRef])

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
            <div className={style.container_grid}>
              <TopNav/>
              <SideNav/>
              <Content />
            </div>
          ) : (
            <Redirect to={ROUTES.login} />
          )}
        </Route>

      
      </Switch>
    </>
  ));
};

export default withCookies(Authentication);
