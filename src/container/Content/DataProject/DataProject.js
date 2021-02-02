import { useObserver } from "mobx-react-lite";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useStores } from "../../../hooks/useStores";
import style from "./DataProject.module.css"

const DataProject = () => {
  const { id } = useParams();
  const { projectStore, rolStore } = useStores();

  try {
    rolStore.getRolesById(id);
  } catch (error){
    console.log(error)
  }

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

    await rolStore.removeRoll(usersArray, rol.name, id)
  }

  const handleSubmit = async (rol) => {
    if (user !== ""){
      rol.users.push(user);
      setUser("")
      setWhatRole("");
      await rolStore.giveRoll(user, rol.name, id);
    }
  }
  console.log(rolStore.roles);
  return useObserver(() => (
    <>
      <h3 className={style.test}>DataProject</h3>
      <ul>
        {rolStore.roles.map(rol => {
          return(
            <>
              <li key={rol.id}>{rol.name} -- {rol.aantal - rol.users.length}</li>
                {rol.users.map(userInRol => (
                  <>
                    <span>{userInRol}</span>
                    <button onClick={() => removeUser(userInRol, rol)} >verwijder user van rol</button>
                  </>
                ))}
              {whatRole === rol.name ? (
                <>
                  <select name="users" id="users" value={user} onChange={e => setUser(e.target.value)}>
                    <option >----</option>
                    {usersWithoutRole.map(user => (
                      // console.log(user)
                      <option key={user.id} value={user.name}>{user.name}</option>
                    ))}
                  </select>
                  <button onClick={() => handleSubmit(rol)}>Bevestigen</button>
                </>
              ):(
                <button onClick={()=> setRole(rol.users, rol.name)}>Geef een rol</button>
              )}
            </>
          )
        })}
      </ul>
    </>
  ));
};

export default DataProject;
