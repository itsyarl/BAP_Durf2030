import React from "react";
import style from "./Acount.module.css";
import { Link } from "react-router-dom";
import { ROUTES } from "../../consts";
import user from "./user.png";

const Comments = () => {

  return (
    <article>
      <h3 className="hidden">comments</h3>
      <ul>
        <li className={style.listitem}>
          <div className={style.listitem__content}>
            <p className={style.listitem__name}>Zoeme?</p>
            <Link className={style.details__link} to={ROUTES.home}>
              <p className={style.details__link__tekst}>Terug naar project</p>
              <div className={style.driehoek}></div>
            </Link>
          </div>
          <div className={style.listitem__content2}>
            <img src={user} alt="user foto"/>
            <p className={style.listitem__user}>Robert Fox</p>
            <p className={style.listitem__date}>2 weken geleden</p>
          </div>
          <p>Super tof project! Zoeme keer samenwerken?</p>
        </li>

        <li className={style.listitem}>
          <div className={style.listitem__content}>
            <p className={style.listitem__name}>Vraagstraat: mensen klappen niet ...</p>
            <Link className={style.details__link} to={ROUTES.home}>
              <p className={style.details__link__tekst}>Terug naar project</p>
              <div className={style.driehoek}></div>
            </Link>
          </div>
          <div className={style.listitem__content2}>
            <img src={user} alt="user foto"/>
            <p className={style.listitem__user}>Robert Fox</p>
            <p className={style.listitem__date}>1 maand geleden</p>
          </div>
          <p>We zouden idd meer moeten communiceren!</p>
        </li>
      </ul>
    </article>
  );
};

export default Comments;
