import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Menu.module.css";
import style from "../../../container/Navigatie/SideNav/Sidebar.module.css";
import map from "../../../container/Navigatie/SideNav/icons/map_icon.svg";
import kijker from "../../../container/Navigatie/SideNav/icons/map_icon.svg";
import add from "../../../container/Navigatie/SideNav/icons/map_icon.svg";
import acount from "../../../container/Navigatie/SideNav/icons/map_icon.svg";
import chat from "../../../container/Navigatie/SideNav/icons/map_icon.svg";
import info from "../../../container/Navigatie/SideNav/icons/map_icon.svg";
import contact from "../../../container/Navigatie/SideNav/icons/map_icon.svg";
import Logout from "../../Logout/Header";

const Menu = ({ open, setOpen }) => {

  const navOpen = {
    transform: `translateX(0)`
  }

  const navClose = {
    transform: `translateX(-100%)`
  }

  return (
    <nav style={open ? navOpen : navClose} className={styles.nav}>
      <div className={style.nav__container}>
        <h4 className={style.nav__titel}>Menu</h4>
        <NavLink activeClassName={style.active} className={style.nav__link} exact to="/" onClick={() => setOpen(!open)}>
          <img className={style.nav__icon} src={map} alt="home icon"/>
          Alle projecten  
        </NavLink>
        <NavLink activeClassName={style.active} className={style.nav__link} to="/indekijker" onClick={() => setOpen(!open)}>
          <img className={style.nav__icon} src={kijker} alt="indekijker icon"/>
          In de kijker  
        </NavLink>
      </div>
    
      <div className={style.nav__container2}>
        <h4 className={style.nav__titel}>Mijn projecten</h4>
        <NavLink activeClassName={style.active} className={style.nav__link} to="/addproject" onClick={() => setOpen(!open)}>
          <img className={style.nav__icon} src={add} alt="addproject icon"/>
          Project toevoegen  
        </NavLink>
        <NavLink activeClassName={style.active} className={style.nav__link} to="/account" onClick={() => setOpen(!open)}>
          <img className={style.nav__icon} src={acount} alt="account icon"/>
          Zie al uw projecten  
        </NavLink>
        <NavLink activeClassName={style.active} className={style.nav__link} to="/chat" onClick={() => setOpen(!open)}>
          <img className={style.nav__icon} src={chat} alt="chat icon"/>
          Chat  
        </NavLink>
      </div>

      <div className={style.nav__container}>
      <h4 className={style.nav__titel}>Info</h4>
        <NavLink activeClassName={style.active} className={style.nav__link} to="/guide" onClick={() => setOpen(!open)}>
          <img className={style.nav__icon} src={info} alt="guide icon"/>
          Gids  
        </NavLink>
        <NavLink activeClassName={style.active} className={style.nav__link} to="/contact" onClick={() => setOpen(!open)}>
          <img className={style.nav__icon} src={contact} alt="contact icon"/>
          Contact
        </NavLink>
      </div>
      <Logout/>
    </nav>
  );
};

export default Menu;
