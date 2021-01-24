// import Link from 'next/link';
import React from "react";
import { Cookies, withCookies } from "react-cookie";
import style from "./Logout.module.css";
import { useStores } from "../../hooks/useStores";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../../consts/index";

const Header = () => {
  const cookies = new Cookies();
  const userToken = cookies.get("userToken");
  const { uiStore } = useStores();
  const history = useHistory();

  const handleLogout =  e => {
    e.preventDefault();
    uiStore.logoutUser(userToken);
    cookies.remove('userToken');
    cookies.remove('userRef');
    console.log(cookies);
    // console.log(result);
    history.push(ROUTES.login);
    // console.log("hey");
  };

  return (
    <div>
      <button className={style.logout} onClick={handleLogout}>
        Log uit
      </button>
    </div>
  );
};

export default withCookies(Header);