import React from "react";
import { useObserver } from "mobx-react-lite";
import style from "./Topbar.module.css"
import Logout from "../../../components/Logout/Header"

const Topbar = () => {
  return useObserver(() => (
    <div className={style.topbar}>
      topnav
      <Logout />
    </div>
  ))
};

export default Topbar;
