import React, { useState } from "react";
import style from "./Authentication.module.css";
import TextInputGroup from "../TextInputGroup";
import User from "../../models/User";
import { useStores } from "../../hooks/useStores";
import { Link } from "react-router-dom";
import { ROUTES } from "../../consts";
import { withCookies, useCookies } from "react-cookie";
import login from './login.gif';

const LoginForm = () => {
  const [cookies, setCookie] = useCookies(["userToken"])
  const { userStore, uiStore } = useStores();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    const user = new User({
      store: userStore,
      email: email,
      password: password
    });

    try{
      const result = await uiStore.loginUser(user);
      setCookie('userToken', result.secret, {path: '/'});
      setCookie('userRef', result.instance.id, {path: '/'});
      console.log(cookies);
    }catch(error) {
      setError("Email of Wachtwoord werd niet gevonden")
    }
  };

  return (
    <section className={style.container}>
      <div className={style.box}>
        <h2 className={style.login_title}>Log in</h2>
        <p className={style.error}>{error}</p>
        <form onSubmit={handleSubmit} className={style.form}>
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
            onChange={e => setPassword(e.currentTarget.value)}
          />
          <div className={style.buttons}>
            <Link className={style.button__back} to={ROUTES.register}>
              <span>Maak een account</span>
            </Link>
            <input type="submit" value="Login" className={style.button__submit}/>
          </div>
          
        </form>
      </div>
      <img src={login} className={style.form__img} alt="login illustratie"/>
    </section>
  );
};

export default withCookies(LoginForm);
