import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import { getAllProjects, getProject }  from "./api";

const App = () => {
  console.log(getAllProjects);
  console.log(getProject);
  return <p>
    Geeeeeld
  </p>
}

ReactDOM.render(<App />, document.getElementById('root'));

