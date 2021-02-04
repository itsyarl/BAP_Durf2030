import React from "react";
import style from "./Acount.module.css";
import { Link } from "react-router-dom";
import { ROUTES } from "../../consts";
import bewerken from "./bewerk.svg";
import del from "./delete.svg";

const Info = () => {

  return (
    <>
      <div className={style.info__user}>
        <address>
          <p className={style.info__label}>Email</p>
          <p className={style.info__input}>Brookyln.Simmons@mail.com</p>
        </address>
        <Link className={style.bewerk__button} to={ROUTES.home}><img className={style.bewerk__img} src={bewerken} alt="bewerken"/>Bewerken</Link>
      </div>
      <div className={style.info__user}>
        <address>
          <p className={style.info__label}>Wachtwoord</p>
          <p className={style.info__input}>***********</p>
        </address>
        <Link className={style.bewerk__button} to={ROUTES.home}><img className={style.bewerk__img} src={bewerken} alt="bewerken"/>Bewerken</Link>
      </div>
      <button className={style.delete__button}><img className={style.delete__img} src={del} alt="delete"/>Verwijder mijn account</button>
    </>
  );
};

export default Info;
