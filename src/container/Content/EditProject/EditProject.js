import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useStores } from "../../../hooks/useStores";
import style from "./EditProject.module.css";
import img from "./projectmarker4.svg";
import { Icon } from "leaflet";
import Project from "../../../models/Project";
import Rol from "../../../models/Rol";
import Funding from "../../../models/Funding";
import { ROUTES } from "../../../consts";
import { MapContainer, TileLayer, Marker, } from 'react-leaflet';
import { Link } from "react-router-dom";

const EditProject = () => {
  const { projectStore, uiStore, rolStore, fundingStore } = useStores();
  const { id } = useParams();
  
  const project = projectStore.getProjectById(id);

  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const [location, setLocation] = useState(project.location);
  const [theme, setTheme] = useState(project.theme);
  const [eventDate, setEventDate] = useState(project.eventDate);
  const [benodigdhedenInput, setBenodigdhedenInput] = useState({product: "", aantal: 0});
  const [rollenInput, setRollenInput] = useState({rol: "", aantal: 0});
  const [benodigdheden, setBenodigdheden] = useState(project.funding);
  const [rollen, setRollen] = useState(project.rollen);
  const [geo, setGeo] = useState(project.geo);

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

  const deleteRol = async (rol) => {
    const array = [...rollen]
    const index = array.indexOf(rol);
    if (index > -1) {
      array.splice(index, 1);
      setRollen(array);
    }
    try{
      await rolStore.removeRol(rol.id);
    } catch(error){
      console.log(error)
    }
  }

  const deleteBenodigdheid = async (benodigdheid) => {
    const array = [...benodigdheden]
    const index = array.indexOf(benodigdheid);
    if (index > -1) {
      array.splice(index, 1);
      setBenodigdheden(array);
    }
    try{
      await fundingStore.removeFunding(benodigdheid.id);
    } catch(error){
      console.log(error)
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

    // const url = `https://api.cloudinary.com/v1_1/dgbx78idf/upload`
    // const formData = new FormData();
    // const imageForm = document.getElementById(`image`).files[0];
    // formData.append('file', imageForm);
    // formData.append('upload_preset', "nouoxmyc");

    // const response = await fetch(url, {
    //   method: "post",
    //   body: formData,
    // });

    // const image = await response.json();
    // console.log(image);

    const p = new Project({ 
      id,
      title,
      description,
      store: projectStore,
      theme,
      eventDate,
      location,
      // image,
      geo
    });

    rollen.map(async rol => {
      if (!rol.id) {
        const r = new Rol({
          projectId: p.id,
          userId: uiStore.currentUser.id,
          name: rol.rol,
          aantal: rol.aantal,
        })
        project.rollen.push(r);
        await rolStore.createRol(r);
      }
    })

    benodigdheden.map(async funding => {
      if (!funding.id) {
        const f = new Funding({
          projectId: p.id,
          userId: uiStore.currentUser.id,
          product: funding.product,
          aantal: funding.aantal,
        })
        project.funding.push(f);
        await fundingStore.createFunding(f);
      }
    })

    try {
      history.push(ROUTES.home);
      const newProject = await projectStore.updateProject(p, id);
      console.log(newProject);
      // projectStore.getValidatedProjects(true);
    } catch(error) {
      console.log(error);
    }

  };

  return (
    <>
      <h3 className={style.title}>Project bewerken</h3>
      <div className={style.add__container}>
        <form onSubmit={handleSubmit} className={style.add__form}>
          <div className={style.add__form__block}>
            <h4 className={style.add__form__block__title}>Basics</h4>
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

            </div>
          </div>
          
          <div className={style.add__form__block}>
            <h4 className={style.add__form__block__title}>Locatie</h4>
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
            <h4 className={style.add__form__block__title}>Benodigdheden</h4>
            <div>
              <label className={style.add__label}>
                <span className={style.add__title}>Benodigdheden</span>
                  <ul>
                    {benodigdheden.map((benodigdheid, index) => (
                      <li key={index}>
                        <span>{index + 1}</span>
                        <span>{benodigdheid.product}</span>
                        <span>{benodigdheid.aantal}</span>
                        <button type="button" onClick={() => deleteBenodigdheid(benodigdheid)}>delete</button>
                      </li>
                    ))}
                  </ul>
                  <span className={style.add__undertext}>#producten</span>
                  <input
                    className={style.add__block}
                    type="text"
                    value={benodigdhedenInput.product}
                    onChange={e => setBenodigdhedenInput({product: e.target.value, aantal: benodigdhedenInput.aantal})}
                  />
                  <input
                    className={style.add__block}
                    type="number"
                    value={benodigdhedenInput.aantal}
                    onChange={e => setBenodigdhedenInput({product: benodigdhedenInput.product, aantal: e.target.value})}
                  />
                </label>
             
              <button type="button" onClick={appendBenodigdheden}>
                Voeg benodigheid toe
              </button>

              <label className={style.add__label}>
                <span className={style.add__title}>Rollen</span>
                  <ul>
                    {rollen.map((rol, index) => (
                      <li key={index}>
                        <span>{index + 1}</span>
                        <span>{rol.name}</span>
                        <span>{rol.aantal}</span>
                        <button type="button" onClick={() => deleteRol(rol)}>delete</button>
                      </li>
                    ))}
                  </ul>
                  <span className={style.add__undertext}>#deze kan je later aan mensen toekennen</span>
                  <input
                    className={style.add__block}
                    type="text"
                    value={rollenInput.rol}
                    onChange={e => setRollenInput({rol: e.target.value, aantal: rollenInput.aantal})}
                  />
                  <input
                    className={style.add__block}
                    type="number"
                    value={rollenInput.aantal}
                    onChange={e => setRollenInput({rol: rollenInput.rol, aantal: e.target.value})}
                  />
              </label>

              <button type="button" onClick={appendRollen}>
                Voeg rol toe
              </button>

            </div>
          </div>
         
          <div className={style.add__form__block}>
            <h4 className={style.add__form__block__title}>Extra's</h4>
            <div>
              <label className={style.add__label}>
                <span className={style.add__title}>Thema</span>
                <span className={style.add__undertext}>Beantwoord het project aan de huidige oproep?</span>
                <input
                  required="required"
                  className={style.add__block}
                  type="text"
                  value={theme}
                  onChange={e => setTheme(e.target.value)}
                />
              </label>

              <label className={style.add__label}>
                <span className={style.add__title}>Deadline project</span>
                <span className={style.add__undertext}>Dag Maand Jaar</span>
                <input
                  required="required"
                  className={style.add__block}
                  type="text"
                  value={eventDate}
                  onChange={e => setEventDate(e.target.value)}
                />
              </label>
              
              {/* <input type="file" id="image" /> */}
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
            <h4 className={style.add__tips__htitle}>Vooruitgang</h4>
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
    </>
  );
};


export default EditProject;
