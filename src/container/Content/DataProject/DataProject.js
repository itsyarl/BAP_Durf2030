import { useObserver } from "mobx-react-lite";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useStores } from "../../../hooks/useStores";
import style from "./DataProject.module.css"

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
    <>
      <h3 className={style.test}>DataProject</h3>
      <ul>
        {project.rollen.map(rol => (
            <>
              <li key={rol.id}>{rol.name} -- {rol.aantal}</li>
                {rol.users.map(userInRol => (
                  <>
                    <span key={userInRol.id}>{userInRol}</span>
                    <button key={userInRol.id} onClick={() => removeUser(userInRol, rol)} >verwijder user van rol</button>
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
        ))}
      </ul>
    </>
  ));
};

export default DataProject;