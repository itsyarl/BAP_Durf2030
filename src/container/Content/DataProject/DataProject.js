import { useObserver } from "mobx-react-lite";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ROUTES } from "../../../consts";
import { useStores } from "../../../hooks/useStores";
import style from "./DataProject.module.css";
import likes from "./likes.svg";
import users from "./users.svg";
import bericht from "./bericht.svg";

const DataProject = () => {
  const { id } = useParams();
  const { projectStore, rolStore } = useStores();

  const project = projectStore.getProjectById(id);
  
  const [whatRole, setWhatRole] = useState("");
  const [user, setUser] = useState("");
  const [usersWithoutRole, setUsersWithoutRole] = useState([]);

  const setRole = (users, name) => {
    setUsersWithoutRole([]);

    //check if participant is already in that role
    project.participants.forEach(userInProject => {
      const userRoles = users.findIndex(user => user === userInProject.name);
      if (userRoles === -1) {
        console.log(userInProject);
        setUsersWithoutRole(usersWithoutRole => [...usersWithoutRole, userInProject]);
      }
    })
    
    setWhatRole(name);
  }

  const removeUser = async (user, rol) => {
    const usersArray = rol.users
    const index = usersArray.indexOf(user);
    if (index > -1) {
      usersArray.splice(index, 1);
    }
    rol.aantal = rol.aantal+1;
    await rolStore.updateRol(rol.id, rol.aantal, usersArray)
  }

  const handleSubmit = async (rol) => {
    if (user !== "" && rol.aantal !== 0){
      rol.users.push(user);
      rol.aantal = rol.aantal -1;
      setUser("")
      setWhatRole("");
      await rolStore.giveRol(user, rol, id);
    }
  }
  // console.log(rolStore.roles);
  return useObserver(() => (
    <section className={style.grid}>
      <div>
        <Link className={style.details__link} to={`${ROUTES.projectDetail.to}${project.id}`}>
          <div className={style.driehoek}></div>
          <p className={style.details__link__tekst}>Terug naar project</p>
        </Link>

        <h2 className={style.title}>DataProject</h2>

        <div>
          <h3 className={style.groepTitle}>Input</h3>
          <div className={style.project__data}>
            <div className={style.project__data__block}>
              <img src={likes} alt="likes"/>
              <p className={style.project__data__text}>3 <span className={style.project__data__snap}>Likes</span></p>
            </div>
            <div className={style.project__data__block}>
              <img src={bericht} alt="berichten"/>
              <p className={style.project__data__text}>124 <span className={style.project__data__snap}>Comments</span></p>
            </div>
            <div className={style.project__data__block}>
              <img src={users} alt="users"/>
              <p className={style.project__data__text}>357 <span className={style.project__data__snap}>Views</span></p>
            </div>
          </div>
        </div>

        <div>
          <h3 className={style.groepTitle}>Funding</h3>
          <div>
            <div>
              <p>progress bars</p>
            </div>
            <ul className={style.funding__list}>
              <li className={`${style.funding__list__item} ${style.funding__item__bottom}`}>
                <p>Wie</p>
                <p>Wat</p>
                <p className={style.funding__list__item__center}>Hoeveelheid</p>
                <p className={style.funding__list__item__center}>Datum</p>
                <p className={style.funding__list__item__center}>Bedankt</p>
              </li>
              <li className={style.funding__list__item}>
                <div className={style.funding__user}>
                  <p className={style.funding__user__img}>img</p>
                  <p>Arlene McCoy</p>
                </div>
                <p>Rode verf</p>
                <p className={style.funding__list__item__center}>1</p>
                <p className={style.funding__list__item__center}>1/28/21</p>
                <p className={style.funding__list__item__center}>like image</p>
              </li>
              <li className={style.funding__list__item}>
                <div className={style.funding__user}>
                  <p className={style.funding__user__img}>img</p>
                  <p>Savannah Nguyen</p>
                </div>
                <p>Banden</p>
                <p className={style.funding__list__item__center}>2</p>
                <p className={style.funding__list__item__center}>1/15/21</p>
                <p className={style.funding__list__item__center}>like image</p>
              </li>
              <li className={style.funding__list__item}>
                <div className={style.funding__user}>
                  <p className={style.funding__user__img}>img</p>
                  <p>Annette Black</p>
                </div>
                <p>Blauw touw</p>
                <p className={style.funding__list__item__center}>223</p>
                <p className={style.funding__list__item__center}>1/1/21</p>
                <p className={style.funding__list__item__center}>like image</p>
              </li>
            </ul>
          </div>
        </div>

        <div className={style.rollen__container}>
          <h3 className={style.groepTitle}>Rollen</h3>
          <div className={style.rollen}>
            {project.rollen.map(rol => (
              <div className={style.rol}>
                <p className={style.rol__username} key={rol.id}>{rol.name} <span className={style.rol__aantal}>{rol.users.length}/{rol.aantal}</span></p>
            
                {whatRole === rol.name ? (
                  <div className={style.rol__dropdown}>
                    <select name="users" id="users" value={user} onChange={e => setUser(e.target.value)}>
                      <option >----</option>
                      {usersWithoutRole.map(user => (
                        // console.log(user)
                        <option key={user.id} value={user.name}>{user.name}</option>
                      ))}
                    </select>
                    <button className={style.rol__button} onClick={() => handleSubmit(rol)}>Bevestigen</button>
                  </div>
                ):(
                  <button className={style.rol__button} onClick={()=> setRole(rol.users, rol.name)}>Geef een rol</button>
                )}
                <ul className={style.rol__users}>
                  {rol.users.map(userInRol => (
                  <li className={`${style.funding__user} ${style.rol__user__space}`}>
                    <div className={style.funding__user}>
                      <p>img</p>
                      <span key={userInRol}>{userInRol}</span>
                    </div>
                    <button className={style.delete} onClick={() => removeUser(userInRol, rol)} >del</button>
                  </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className={style.fixed__users}>
          <h2 className={style.title__users}>Deelnemers</h2>
          <div>
            <button className={`${style.filter__users} ${style.filter__users__active}`}>A-Z</button>
            <button className={style.filter__users}>Z-A</button>
            <button className={style.filter__users}>Nieuwste</button>
          </div>

          <ul className={style.deelnemen__list}>
            <li className={`${style.funding__user}`}>
              <p className={style.funding__user__img}>img</p>
              <p className={`${style.funding__user__name} ${style.user}`}>Robert Fox <span className={style.funding__user__name__span}>geen rol</span></p>
            </li>
            <li className={`${style.funding__user}`}>
              <p className={style.funding__user__img}>img</p>
              <p className={`${style.funding__user__name} ${style.user}`}>Leslie Alexander <span className={style.funding__user__name__span}>Poster designer</span></p>
            </li>
            <li className={`${style.funding__user}`}>
              <p className={style.funding__user__img}>img</p>
              <p className={`${style.funding__user__name} ${style.user}`}>Devon Lane <span className={style.funding__user__name__span}>geen rol</span></p>
            </li>
            <li className={`${style.funding__user}`}>
              <p className={style.funding__user__img}>img</p>
              <p className={`${style.funding__user__name} ${style.user}`}>Robert Fox <span className={style.funding__user__name__span}>geen rol</span></p>
            </li>
            <li className={`${style.funding__user}`}>
              <p className={style.funding__user__img}>img</p>
              <p className={`${style.funding__user__name} ${style.user}`}>Leslie Alexander <span className={style.funding__user__name__span}>Poster designer</span></p>
            </li>
            <li className={`${style.funding__user}`}>
              <p className={style.funding__user__img}>img</p>
              <p className={`${style.funding__user__name} ${style.user}`}>Devon Lane <span className={style.funding__user__name__span}>geen rol</span></p>
            </li>
            <li className={`${style.funding__user}`}>
              <p className={style.funding__user__img}>img</p>
              <p className={`${style.funding__user__name} ${style.user}`}>Robert Fox <span className={style.funding__user__name__span}>geen rol</span></p>
            </li>
            <li className={`${style.funding__user}`}>
              <p className={style.funding__user__img}>img</p>
              <p className={`${style.funding__user__name} ${style.user}`}>Leslie Alexander <span className={style.funding__user__name__span}>Poster designer</span></p>
            </li>
            <li className={`${style.funding__user}`}>
              <p className={style.funding__user__img}>img</p>
              <p className={`${style.funding__user__name} ${style.user}`}>Devon Lane <span className={style.funding__user__name__span}>geen rol</span></p>
            </li>
            <li className={`${style.funding__user}`}>
              <p className={style.funding__user__img}>img</p>
              <p className={`${style.funding__user__name} ${style.user}`}>Robert Fox <span className={style.funding__user__name__span}>geen rol</span></p>
            </li>
            <li className={`${style.funding__user}`}>
              <p className={style.funding__user__img}>img</p>
              <p className={`${style.funding__user__name} ${style.user}`}>Leslie Alexander <span className={style.funding__user__name__span}>Poster designer</span></p>
            </li>
            <li className={`${style.funding__user}`}>
              <p className={style.funding__user__img}>img</p>
              <p className={`${style.funding__user__name} ${style.user}`}>Devon Lane <span className={style.funding__user__name__span}>geen rol</span></p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  ));
};

export default DataProject;