import React, { useState } from "react";
import style from "./Authentication.module.css";
import TextInputGroup from "../TextInputGroup";
import User from "../../models/User";
import { useStores } from "../../hooks/useStores";
import { withCookies, useCookies } from "react-cookie";

const LoginForm = () => {
  const [cookies, setCookie] = useCookies(["userToken"])
  const { userStore, uiStore } = useStores();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    const user = new User({
      store: userStore,
      email: email,
      password: password
    });
    const result = await uiStore.loginUser(user);
    setCookie('userToken', result.secret, {path: '/'});
    setCookie('userRef', result.instance.id, {path: '/'});
    console.log(cookies);
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
          onChange={e => setPassword(e.currentTarget.value)}
        />
        <input type="submit" value="Login" className={style.button} />
      </form>
    </div>
  );
};

export default withCookies(LoginForm);
