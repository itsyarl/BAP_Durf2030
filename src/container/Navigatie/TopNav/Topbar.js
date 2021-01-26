import React from "react";
import { useObserver } from "mobx-react-lite";
import style from "./Topbar.module.css"
import Logout from "../../../components/Logout/Header"
import lightmode from "./lightmode.svg";
import notification from "./notification.svg";

import { useStores } from "../../../hooks/useStores";

const Topbar = () => {

  const { uiStore } = useStores();
  const user = uiStore.currentUser;

  return useObserver(() => (
    <div className={style.topbar}>
      <div className={style.topbar__fixed}>
        <img src={lightmode} className={style.mode} alt="mode"/>
        <img src={notification} className={style.notifications} alt="notifications"/>
        <img src={user.image} className={style.user} alt="user"/>
        <div className={style.userInfo}>
          <p className={style.userInfo__name}>{user.name}</p>
          <p className={style.userInfo__status}>Online</p>  
        </div> 
        <Logout />
      </div>
    </div>
  ))
};

export default Topbar;
