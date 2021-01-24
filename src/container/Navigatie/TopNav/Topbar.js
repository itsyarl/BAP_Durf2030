import React from "react";
import { useObserver } from "mobx-react-lite";
import style from "./Topbar.module.css"
import Logout from "../../../components/Logout/Header"
import lightmode from "./lightmode.svg";
import notification from "./notification.svg";
import user from "./user.png";

const Topbar = () => {
  return useObserver(() => (
    <div className={style.topbar}>
      <div className={style.topbar__fixed}>
        <img src={lightmode} className={style.mode} alt="mode"/>
        <img src={notification} className={style.notifications} alt="notifications"/>
        <img src={user} className={style.user} alt="user"/>
        <div className={style.userInfo}>
          <p className={style.userInfo__name}>Floyd Miles</p>
          <p className={style.userInfo__status}>Online</p>  
        </div> 
        <Logout />
      </div>
    </div>
  ))
};

export default Topbar;
