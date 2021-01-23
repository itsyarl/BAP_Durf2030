import React from "react";
import { useObserver } from "mobx-react-lite";
import style from "./Topbar.module.css"

const Topbar = () => {
  return useObserver(() => (
    <div className={style.test}>

    </div>
  ))
};

export default Topbar;
