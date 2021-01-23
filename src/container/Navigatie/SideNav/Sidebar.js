import React from "react";
import { useObserver } from "mobx-react-lite";
import style from "./Sidebar.module.css"

const Sidebar = () => {
  return useObserver(() => (
    <div className={style.test}>

    </div>
  ))
};

export default Sidebar;
