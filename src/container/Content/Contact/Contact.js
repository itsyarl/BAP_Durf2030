import { Link } from "react-router-dom";
import React from "react";
import style from "./Contact.module.css";
import { ROUTES } from "../../../consts";

const Contact = () => {

  return (
    <>
      <h3 className={style.test}>contact</h3>
      <div>
        <h4>DURF2030 Team</h4>
        <p>Katrien Voet</p>
        <p>Gangmaker DURF2030</p>
        <p>katrien.voet@kortrijk.be - 0473 86 28 75</p>

        <p>Naima Delaere</p>
        <p>Communicatie- en projectmedewerker</p>
        <p>naima.delaere@kortrijk.be - 0474 96 04 35</p>

        <h4>Of spring binnen!</h4>
        <p>BK6 - Broelkaai 6 8500 Kortrijk</p>

        <p>Zodra het weer kan, mag je ook gewoon binnenspringen voor een koffie of een lekkere lunch in Café BK6 Di-Zon van 11:00-23:00</p>
        map
      </div>

      <div>
        <h4>Bericht</h4>
        <form>
          textcop(email)

          textcop(bericht)

          checkbox (Ja, ik ga akkoord dat mijn gegevens bewaard worden)

          <Link to={ROUTES.home}><span>Annuleren</span></Link>
          <button>Versturen</button>
        </form>
      </div>
    </>
  );
};

export default Contact;
