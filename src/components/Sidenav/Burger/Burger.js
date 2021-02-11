import React from "react";
import style from "./Burger.module.css";

const Burger = ({ open, setOpen }) => {
  return (
    <button className={style.container} open={open} onClick={() => setOpen(!open)}>
      <div className={style.container__item}/>
      <div className={style.container__item}/>
      <div className={style.container__item}/>
    </button>
  );
};

export default Burger;
