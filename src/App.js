import React from "react";
import { withCookies } from "react-cookie";
import Authentication from "./components/Authentication";

function App() {
  // Authorization: Bearer ;
  return (
    <>
      <Authentication/>
    </>
  );
}

export default withCookies(App);