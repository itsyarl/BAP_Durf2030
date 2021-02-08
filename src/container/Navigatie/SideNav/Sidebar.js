import React from "react";
import { useObserver } from "mobx-react-lite";
import style from "./Sidebar.module.css"
import logo from "./durflogo.svg"
import chat from "./icons/chat_icon.svg"
import add from "./icons/add_icon.svg"
import acount from "./icons/acount_icon.svg"
import info from "./icons/info_icon.svg"
import contact from "./icons/contact_icon.svg"
import map from "./icons/map_icon.svg"
import kijker from "./icons/kijker_icon.svg"
import { NavLink, Link } from "react-router-dom";
import { ROUTES } from "../../../consts";

const Sidebar = () => {
  return useObserver(() => (
    <section className={style.sidebar}>
      <h2 className="hidden">Sidenav</h2>
      <div className={style.sidebar__fixed}>
        <Link className={style.logo} to={ROUTES.home}><img src={logo} alt="durf2030 logo"/></Link>

        <nav className={style.nav}>
          <div className={style.nav__container}>
            <h4 className={style.nav__titel}>Menu</h4>
            <NavLink activeClassName={style.active} className={style.nav__link} exact to="/">
              <img className={style.nav__icon} src={map} alt="guide icon"/>
              Alle projecten  
            </NavLink>
            <NavLink activeClassName={style.active} className={style.nav__link} to="/indekijker">
              <img className={style.nav__icon} src={kijker} alt="guide icon"/>
              In de kijker  
            </NavLink>
          </div>
        
          <div className={style.nav__container2}>
            <h4 className={style.nav__titel}>Mijn projecten</h4>
            <NavLink activeClassName={style.active} className={style.nav__link} to="/addproject">
              <img className={style.nav__icon} src={add} alt="guide icon"/>
              Project toevoegen  
            </NavLink>
            <NavLink activeClassName={style.active} className={style.nav__link} to="/account">
              <img className={style.nav__icon} src={acount} alt="guide icon"/>
              Zie al uw projecten  
            </NavLink>
            <NavLink activeClassName={style.active} className={style.nav__link} to="/chat">
              <img className={style.nav__icon} src={chat} alt="guide icon"/>
              Chat  
            </NavLink>
          </div>

          <div className={style.nav__container}>
          <h4 className={style.nav__titel}>Info</h4>
            <NavLink activeClassName={style.active} className={style.nav__link} to="/guide">
              <img className={style.nav__icon} src={info} alt="guide icon"/>
              Gids  
            </NavLink>
            <NavLink activeClassName={style.active} className={style.nav__link} to="/contact">
              <img className={style.nav__icon} src={contact} alt="contact icon"/>
              Contact
            </NavLink>
          </div>
        </nav>

        <footer className={style.nav__footer}>
          <p>
            Privacy  · Voorwaarden  · Adverteren  · Advertentievoorkeuren   · Cookies  ·   · Durf2030 &copy; 2021
          </p>
        </footer>
      </div>
    </section>
  ))
};

export default Sidebar;
