import React, { useState } from "react";
import style from "./Authentication.module.css";
import TextInputGroup from "../TextInputGroup";
import { useStores } from "../../hooks/useStores";
import User from "../../models/User";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../../consts";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");

  const { uiStore, userStore } = useStores();
  const history = useHistory();

  const handleSubmit = async e => {
    e.preventDefault();
    if (password) {
      const user = new User({
        email: email,
        store: userStore,
        password: password
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
    <div className={style.container}>
      <form onSubmit={handleSubmit} className={style.form}>
      <TextInputGroup
          label="Email"
          name="email"
          type="email"
          placeholder="Fill in your email."
          value={email}
          onChange={e => setEmail(e.currentTarget.value)}
        />
        <TextInputGroup
          label="Password"
          type="password"
          name="Password"
          placeholder="Fill in your password."
          value={password}
          onChange={e => setPassWord(e.currentTarget.value)}
        />
        <input type="submit" value="Register" className={style.button} />
      </form>
    </div>
  );
};
  
  export default RegisterForm;