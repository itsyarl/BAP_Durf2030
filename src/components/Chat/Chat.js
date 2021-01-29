import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../consts/index";

const Project = ({chat}) => {

    return (
      <>
        <Link to={`${ROUTES.messages.to}${chat.id}`}>
          <li>{chat.title}</li> 
        </Link>
      </>
    );
};

export default Project;
