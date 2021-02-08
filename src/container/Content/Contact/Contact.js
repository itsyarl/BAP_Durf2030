import { Link } from "react-router-dom";
import React from "react";
import style from "./Contact.module.css";
import { ROUTES } from "../../../consts";
import { MapContainer, TileLayer, Marker} from 'react-leaflet';
import { Icon } from 'leaflet';
import pin from "./projectmarker4.svg";

const project = new Icon({
  iconUrl: pin,
  iconSize: [35, 35]
});

const Contact = () => {

  return (
    <section>
      <h3 className={style.test}>Contact</h3>
      <div className={style.contact__grid}>
        <div>
          <h4 className={style.contact__title}>DURF2030 Team</h4>
          <p className={style.contact__info}>
            <span>Katrien Voet</span>
            <span>Gangmaker DURF2030</span>
            <span>katrien.voet@kortrijk.be - 0473 86 28 75</span>
          </p>

          <p className={style.contact__info}>
            <span>Naima Delaere</span>
            <span>Communicatie- en spanrojectmedewerker</span>
            <span>naima.delaere@kortrijk.be - 0474 96 04 35</span>
          </p>

          <h4 className={`${style.contact__title} ${style.contact__title__top}`}>Of spring binnen!</h4>
          <p className={style.contact__info}>
            <span>BK6 - Broelkaai 6</span> 
            <span>8500 Kortrijk</span>
          </p>

          <p className={`${style.contact__info} ${style.contact__light}`}>
            <span>Zodra het weer kan, mag je ook gewoon binnenspringen</span> 
            <span>voor een koffie of een lekkere lunch in Café BK6</span> 
            <span>Di-Zon van 11:00-23:00</span>
          </p>
          <MapContainer className={style.map} center={[50.8308962, 3.2663289]} zoom={15} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[50.8308962, 3.2663289]} icon={project}></Marker>
        </MapContainer>
        </div>

        <div>
          <h4 className={style.contact__title}>Bericht</h4>
          <form>
            <label className={style.contact__label}>Email:
              <input type="email" className={style.contact__input}/>
            </label>

            <label className={style.contact__label}>Bericht:
            <textarea
              className={style.contact__textarea}
              type="text"
              name="bericht"
            />
            </label>

            <div className={style.contact__checkbox__contaier}>
              <input type="checkbox"  value="checkbox"/>
              <span className={`${style.contact__checkbox__span} ${style.contact__light}`}>Ja, ik ga akkoord dat mijn gegevens bewaard worden</span>
            </div>

            <div className={style.buttons}>
              <Link to={ROUTES.home} className={style.button__back}><span>Annuleren</span></Link>
              <input className={style.button__submit} type="submit" value="versturen"/>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
