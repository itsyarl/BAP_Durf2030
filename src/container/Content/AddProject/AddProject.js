import React from "react";
import Project from "../../../models/Project";
import { useState } from "react";
import { useStores } from "../../../hooks/useStores";
import style from "./AddProject.module.css";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../consts";
import { useHistory } from "react-router-dom";
import Rol from "../../../models/Rol";
import { MapContainer, TileLayer, Marker, } from 'react-leaflet';
import { Icon } from "leaflet";
import img from "./projectmarker4.svg";
import Funding from "../../../models/Funding";

const AddProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [theme, setTheme] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [benodigdhedenInput, setBenodigdhedenInput] = useState({product: "", aantal: 0});
  const [rollenInput, setRollenInput] = useState({rol: "", aantal: 0});
  const [coOwnerInput, setCoOwnerInput] = useState({});
  const [benodigdheden, setBenodigdheden] = useState([]);
  const [rollen, setRollen] = useState([]);
  const [coOwners, setCoOwners] = useState([]);
  const [geo, setGeo] = useState({lat: 50.82803, lng: 3.26487});

  const { projectStore, uiStore, rolStore, fundingStore } = useStores();
  const history = useHistory();

  const appendBenodigdheden = () => {
    if (benodigdhedenInput.product !== "" && benodigdhedenInput.aantal !== 0) {
      setBenodigdhedenInput({product: "", aantal: 0});
      setBenodigdheden(benodigdheden.concat(benodigdhedenInput));
    }
  }

  const icon = new Icon({
    iconUrl: img,
    iconSize: [40, 40]
  });

  const appendRollen = () => {
    if (rollenInput.rol !== "" && rollenInput.aantal !== 0) {
      setRollenInput({rol: "", aantal: 0});
      setRollen(rollen.concat(rollenInput));
    }
  }

  const appendCoOwner = () => {
    if (coOwnerInput !== "") {
      setCoOwnerInput("");
      setCoOwners(coOwners.concat(coOwnerInput));
    }
  }

  const deleteRol = (rol) => {
    const array = [...rollen]
    const index = array.indexOf(rol);
    if (index > -1) {
      array.splice(index, 1);
      setRollen(array);
    }
  }

  const deleteCoOwner = (participant) => {
    const array = [...coOwners]
    const index = array.indexOf(participant);
    if (index > -1) {
      array.splice(index, 1);
      setCoOwners(array);
    }
  }

  const deleteBenodigdheid = (rol) => {
    const array = [...benodigdheden]
    const index = array.indexOf(rol);
    if (index > -1) {
      array.splice(index, 1);
      setBenodigdheden(array);
    }
  }

  const geoChange = async (location) => {
    setLocation(location);
    
    //set geo locatie voor map
    const getGeo = await fetch(`http://open.mapquestapi.com/geocoding/v1/address?key=${'3l5afEGTejjwWZXsj0NsSJKkQzT6cdpH'}&location=${location}`);
    const geoObj = await getGeo.json();
    
    if (geoObj.results[0].locations[0] !== undefined) {
      setGeo(geoObj.results[0].locations[0].latLng);
    } else {
      setGeo({lat: 50.82803, lng: 3.26487});
    }
  }

  const handleSubmit = async e => {
    e.preventDefault();

    const url = `https://api.cloudinary.com/v1_1/dgbx78idf/upload`
    const formData = new FormData();
    const imageForm = document.getElementById(`image`).files[0];
    formData.append('file', imageForm);
    formData.append('upload_preset', "nouoxmyc");

    const response = await fetch(url, {
      method: "post",
      body: formData,
    });

    const image = await response.json();
    console.log(image);

    const p = new Project({ 
      title,
      description,
      store: projectStore,
      theme,
      eventDate,
      location,
      image,
      geo,
      coOwners
    });

    rollen.map(async rol => {
      const r = new Rol({
        projectId: p.id,
        userId: uiStore.currentUser.id,
        name: rol.rol,
        aantal: rol.aantal,
      })

      await rolStore.createRol(r);
    })

    benodigdheden.map(async funding => {
      const f = new Funding({
        projectId: p.id,
        userId: uiStore.currentUser.id,
        product: funding.product,
        aantal: funding.aantal,
      })

      await fundingStore.createFunding(f);
    })

    try {
      history.push(ROUTES.home);
      const newProject = await projectStore.createProject(p);
      console.log(newProject);
    } catch(error){
      console.log(error);
    }

  };

  return (
    <section>
      <h2 className={style.title}>Project aanmaken</h2>
      <div className={style.add__container}>
        <form onSubmit={handleSubmit} className={style.add__form}>
          <div className={style.add__form__block}>
            <h3 className={style.add__form__block__title}>Basics</h3>
            <div>
              <label className={style.add__label}>
                <span className={style.add__title}>Title</span>
                <span className={style.add__undertext}>Trek de aandacht met een goeie titel</span>
                <input
                  required="required"
                  className={style.add__block}
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </label>

              <label className={style.add__label}>
                <span className={style.add__title}>Project omschrijving</span>
                <span className={style.add__undertext}>Korte beschrijving van jouw project</span>
                <input
                  required="required"
                  className={style.add__block}
                  type="text"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </label>

              <label className={style.add__label}>
                <span className={style.add__title}>Met wie werk je samen</span>
                  <ul>
                    {coOwners.map((participant, index) => (
                      <li key={index} className={style.product__item}>
                        <span className={style.product__item__num}>{index + 1}#</span>
                        <span className={style.product__item__naam}>{participant}</span>
                        <button type="button" onClick={() => deleteCoOwner(participant)}>delete</button>
                      </li>
                    ))}
                  </ul>

              </label>

              <button className={style.toevoegen} type="button" onClick={appendCoOwner}>
                + Voeg mede-eigenaar toe
              </button>

            </div>
          </div>
          
          <div className={style.add__form__block}>
            <h3 className={style.add__form__block__title}>Locatie</h3>
            <div>
              <label className={style.add__label}>
                <span className={style.add__title}>Adres</span>
                <span className={style.add__undertext}>Gemeente, straat, nr</span>
                <input
                  required="required"
                  className={style.add__block}
                  type="text"
                  value={location}
                  onChange={e => geoChange(e.target.value)}
                />
              </label>
              <MapContainer className={style.map} center={[50.82803, 3.26487]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker 
                  position={[geo.lat, geo.lng]}
                  icon={icon}   
                >
                </Marker>
              </MapContainer>
            </div>
          </div>
          
          <div className={style.add__form__block}>
            <h3 className={style.add__form__block__title}>Funding</h3>
            <div className={style.funding__container}>
              <label className={style.add__label}>
                <span className={style.add__title}>Benodigdheden</span>
                  <ul>
                    {benodigdheden.map((benodigdheid, index) => (
                      <li className={style.product__item}>
                        <span className={style.product__item__num}>{index + 1}#</span>
                        <span className={style.product__item__naam}>{benodigdheid.product}</span>
                        <span className={style.product__item__aantal}>{benodigdheid.aantal}</span>
                        <button type="button" onClick={() => deleteBenodigdheid(benodigdheid)}>delete</button>
                      </li>
                    ))}
                  </ul>
                  <span className={style.add__undertext}>#producten</span>
                  <span>
                    <input
                      className={`${style.add__block} ${style.product}`}
                      type="text"
                      value={benodigdhedenInput.product}
                      onChange={e => setBenodigdhedenInput({product: e.target.value, aantal: benodigdhedenInput.aantal})}
                    />
                    <input
                      className={`${style.add__block} ${style.aantal}`}
                      type="number"
                      value={benodigdhedenInput.aantal}
                      onChange={e => setBenodigdhedenInput({product: benodigdhedenInput.product, aantal: e.target.value})}
                    />
                  </span>
                </label>
             
              <button className={style.toevoegen} type="button" onClick={appendBenodigdheden}>
                + Voeg item toe
              </button>

              <label className={style.add__label}>
                <span className={style.add__title}>Rollen</span>
                  <ul>
                    {rollen.map((rol, index) => (
                      <li className={style.product__item}>
                        <span className={style.product__item__num}>{index + 1}#</span>
                        <span className={style.product__item__naam}>{rol.rol}</span>
                        <span className={style.product__item__aantal}>{rol.aantal}</span>
                        <button type="button" onClick={() => deleteRol(rol)}>delete</button>
                      </li>
                    ))}
                  </ul>
                  <span className={style.add__undertext}>#deze kan je later aan mensen toekennen</span>
                  <span>
                    <input
                      className={`${style.add__block} ${style.product}`}
                      type="text"
                      value={rollenInput.rol}
                      onChange={e => setRollenInput({rol: e.target.value, aantal: rollenInput.aantal})}
                    />
                    <input
                      className={`${style.add__block} ${style.aantal}`}
                      type="number"
                      value={rollenInput.aantal}
                      onChange={e => setRollenInput({rol: rollenInput.rol, aantal: e.target.value})}
                    />
                  </span>
              </label>

              <button className={style.toevoegen} type="button" onClick={appendRollen}>
                + Voeg rol toe
              </button>

            </div>
          </div>
         
          <div className={style.add__form__block}>
            <h3 className={style.add__form__block__title}>Extra's</h3>
            <div>
              <label className={style.add__label}>
                <span className={style.add__title}>Thema</span>
                <span className={style.add__undertext}>Beantwoord het project aan de huidige oproep?</span>
                <select name="thema" id="thema" value={theme} onChange={e => setTheme(e.target.value)}>
                  <option value="">----</option>
                  <option value="Eenzaamheid">Eenzaamheid</option>
                </select>
              </label>

              <label className={style.add__label}>
                <span className={style.add__title}>Deadline project</span>
                <span className={style.add__undertext}>Dag/Maand/Jaar</span>
                <input
                  required="required"
                  className={style.add__block}
                  type="date"
                  value={eventDate}
                  onChange={e => setEventDate(e.target.value)}
                />
              </label>
              
              <input required="required" className={style.img__input} type="file" id="image" />
            </div>
          </div>

          <div className={style.butttons}>
            <Link className={style.logout} to={ROUTES.home}>
                <span>Anuleren</span>
            </Link>
            <input 
              className={style.button__submit}
              type="submit"
              value="Project voorstellen"
            />
          </div>
        </form>

        <div className={style.add__tips__box}>
          <div className={style.add__tips}>
            <div className={style.add__tips__container}>
              <h5 className={style.add__tips__title}>Tips</h5>
              <p className={style.add__tips__subtitle}>#1</p>
              <p className={style.add__tips__text}>Hou de titel kort en simpel, zorg dat het de aandacht trekt van de lezer.</p>

              <p className={style.add__tips__subtitle}>#2</p>
              <p className={style.add__tips__text}>Upload een toffe foto om uit de menigte van projecten uit te springen.</p>

              <p className={style.add__tips__subtitle}>#3</p>
              <p className={style.add__tips__text}>Probeer zo duidelijk mogelijk te zijn bij de benodigdheden. Schrijf maateenheden waar nodig anders krijg je misschien 4cl melk ipv 4 liter</p>

              <p className={style.add__tips__subtitle}>#4</p>
              <p className={style.add__tips__text}>Plaats regelmatig een update zodat andere mensen het project beter kunnen volgen.</p>

              <p className={style.add__tips__subtitle}>#5</p>
              <p className={style.add__tips__text}>Vergeet niet wanneer je project klaar is het impact formulier in te vullen.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddProject;
