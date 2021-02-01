import React from "react";
import Project from "../../../models/Project";
import { useState } from "react";
import { useStores } from "../../../hooks/useStores";
import style from "./AddProject.module.css";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../consts";


const AddProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [theme, setTheme] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [benodigdhedenInput, setBenodigdhedenInput] = useState({product: "", aantal: 0});
  const [rollenInput, setRollenInput] = useState({rol: "", aantal: 0});
  const [benodigdheden, setBenodigdheden] = useState([]);
  const [rollen, setRollen] = useState([]);

  const { projectStore } = useStores();

  const appendBenodigdheden = () => {
    if (benodigdhedenInput.product !== "" && benodigdhedenInput.aantal !== 0) {
      setBenodigdhedenInput({product: "", aantal: 0});
      setBenodigdheden(benodigdheden.concat(benodigdhedenInput));
    }
  }

  const appendRollen = () => {
    if (rollenInput.product !== "" && rollenInput.aantal !== 0) {
      setRollenInput({rol: "", aantal: 0});
      setRollen(rollen.concat(rollenInput));
    }
  }

  const deleteRol = (rol) => {
    console.log(rol)
    const array = [...rollen]
    const index = array.indexOf(rol);
    if (index > -1) {
      array.splice(index, 1);
      setRollen(array);
    }
  }


  const deleteBenodigdheid = (rol) => {
    console.log(rol)
    const array = [...benodigdheden]
    const index = array.indexOf(rol);
    if (index > -1) {
      array.splice(index, 1);
      setBenodigdheden(array);
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
      benodigdheden,
      rollen
    });
    try {
      const newProject = await projectStore.createProject(p);
      console.log(newProject);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h3 className={style.title}>Project aanmaken</h3>
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
                  onChange={e => setLocation(e.target.value)}
                />
              </label>
            </div>
          </div>
          
          <div className={style.add__form__block}>
            <h4 className={style.add__form__block__title}>Benodigdheden</h4>
            <div>
              <label className={style.add__label}>
                <span className={style.add__title}>Benodigdheden</span>
                  <ul>
                    {benodigdheden.map(benodigdheid => (
                      <li>
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
                    value={benodigdhedenInput.benodigdheden}
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
                    {rollen.map(rol => (
                      <li>
                        <span>{rol.rol}</span>
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
              
              <input required="required" type="file" id="image" />
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

export default AddProject;
