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
  const [name, setName] = useState("");

  const { uiStore, userStore } = useStores();
  const history = useHistory();

  const handleSubmit = async e => {
    
  };

  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit} className={style.form}>

      </form>
    </div>
  );
};
  
  export default RegisterForm;