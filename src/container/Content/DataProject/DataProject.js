import { useObserver } from "mobx-react-lite";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ROUTES } from "../../../consts";
import { useStores } from "../../../hooks/useStores";
import style from "./DataProject.module.css";
import styles from "../../../styles/animatie.module.css";
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
        <Link className={styles.details__link} to={`${ROUTES.projectDetail.to}${project.id}`}>
          <div className={styles.driehoek}></div>
          <p className={styles.details__link__tekst}>Terug naar project</p>
        </Link>

        <h2 className={style.title}>DataProject</h2>

        <div>
          <h3 className={style.groepTitle}>Input</h3>
          <div className={style.project__data}>
            <div className={style.project__data__block}>
              <img src={likes} alt="likes"/>
              <p className={style.project__data__text}>{project.likes}<span className={style.project__data__snap}>Likes</span></p>
            </div>
            <div className={style.project__data__block}>
              <img src={bericht} alt="berichten"/>
              <p className={style.project__data__text}>{project.comments.length}<span className={style.project__data__snap}>Comments</span></p>
            </div>
            <div className={style.project__data__block}>
              <img src={users} alt="users"/>
              <p className={style.project__data__text}>{project.participants.length}<span className={style.project__data__snap}>Medewerkers</span></p>
            </div>
          </div>
        </div>

        <div>
          <h3 className={style.groepTitle}>Funding</h3>
          <div>
            <ul className={style.funding__list}>
              <li className={`${style.funding__list__item} ${style.funding__item__bottom}`}>
                <p>wat</p>
                <p className={style.funding__list__item__center}>Aantal</p>
                <p className={style.funding__list__item__center}>Nog nodig</p>
                {/* <p className={style.funding__list__item__center}>Datum</p> */}
                <p className={style.funding__list__item__center}>Bedankt</p>
              </li>

              {project.funding.map(fund => (
                <li key={fund.id} className={style.funding__list__item}>
                  <div className={style.funding__user}>
                    <p>{fund.product}</p>
                  </div>
                  <p className={style.funding__list__item__center}>{fund.users.length}</p>
                  <p className={style.funding__list__item__center}>{fund.aantal}</p>
                  <img className={style.funding__list__item__center} src={likes} alt="like" width="15" />
              </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={style.rollen__container}>
          <h3 className={style.groepTitle}>Rollen</h3>
          <div className={style.rollen}>
            {project.rollen.map(rol => (
              <div key={rol.id} className={style.rol}>
                <p className={style.rol__username} key={rol.id}>{rol.name} <span className={style.rol__aantal}>nog {rol.aantal} te gaan voor deze rol</span></p>
            
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
                    <li key={userInRol} className={`${style.funding__user} ${style.rol__user__space}`}>
                      <div className={style.funding__user}>
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

      <div className={style.fixed__users__box}>
        <div className={style.fixed__users}>
          <h2 className={style.title__users}>Deelnemers</h2>
          <div>
            <button className={`${style.filter__users} ${style.filter__users__active}`}>A-Z</button>
            <button className={style.filter__users}>Z-A</button>
            <button className={style.filter__users}>Nieuwste</button>
          </div>

          <ul className={style.deelnemen__list}>
            {project.participants.map(participant => (
              <li key={participant.id} className={`${style.funding__user}`}>
                <img key={participant.id} src={participant.avatar} className={style.user} width="30" alt="user"/>
                <p className={`${style.funding__user__name} ${style.user}`}>{participant.name}
                  {participant.rollen.map(rol => (
                    <span key={rol.id} className={style.funding__user__name__span}>{rol.name}</span>
                  ))}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  ));
};

export default DataProject;