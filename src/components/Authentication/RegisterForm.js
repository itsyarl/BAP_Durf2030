import React, { useState } from "react";
import style from "./Authentication.module.css";
import TextInputGroup from "../TextInputGroup";
import { useStores } from "../../hooks/useStores";
import User from "../../models/User";
import { useHistory, Link } from "react-router-dom";
import { ROUTES } from "../../consts";
import signup from './signup.svg';

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [companyName, setCompanyName] = useState("");

  const { uiStore, userStore } = useStores();
  const history = useHistory();

  const handleSubmit = async e => {
    e.preventDefault();
    if (password) {
      const user = new User({
        admin: false,
        email: email,
        store: userStore,
        password: password,
        name: name,
        companyName: companyName
      });
      const result = await uiStore.registerUser(user);
      if (result.uid) {
        console.log(result.email);
        //gebruiker is correct geregistreerd
        history.push(ROUTES.home);
      } else {
        //registratie mislukt
        console.log(result);
      }
    }
  };

  return (
    <section className={style.container}>
      <div className={style.box}>
        <h2 className={style.login_title}>Creëer account</h2>
        <form onSubmit={handleSubmit} className={style.form}>
        <label className={style.add__label}>
          <span className={style.add__title}>Werk je onder een bedrijf?</span>
          <input 
            id="company"
            type="checkbox" 
            value={true}
            onChange={e => setCompany(e.target.value)}
          />
          </label>
          {company ? (
            <label>
        <TextInputGroup
            label="Naam van de organisatie:"
            name="company"
            type="company"
            placeholder="groeps-/bedrijfsnaam"
            value={companyName}
            onChange={e => setCompanyName(e.currentTarget.value)}
          />
            </label>
          ):(
            <span>niets</span>
          )}
        <TextInputGroup
            label="Email:"
            name="email"
            type="email"
            placeholder="Fill in your email."
            value={email}
            onChange={e => setEmail(e.currentTarget.value)}
          />
          <TextInputGroup
            label="Wachtwoord:"
            type="password"
            name="Password"
            placeholder="Fill in your password."
            value={password}
            onChange={e => setPassWord(e.currentTarget.value)}
          />
          <TextInputGroup
            label="Naam:"
            type="name"
            name="name"
            placeholder="Fill in your name."
            value={name}
            onChange={e => setName(e.currentTarget.value)}
          />
          <div className={style.buttons}>
            <Link className={style.button__account} to={ROUTES.login}>
              Ik heb al een account
            </Link>
            <input type="submit" value="Maak account" className={style.button__submit}/>
          </div>
        </form>
      </div>
      <img src={signup} className="App-logo" alt="login illustratie"/>
    </section>
  );
};
  
  export default RegisterForm;