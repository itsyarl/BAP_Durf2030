import React from "react";
import { withCookies } from "react-cookie";
import Authentication from "./components/Authentication";

function App() {
  // Authorization: Bearer ;
  return (
    <section>
      <Authentication/>
    </section>
  );
}

export default withCookies(App);