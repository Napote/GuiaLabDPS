import React, { useContext } from "react";
import { Router } from "@reach/router";

import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import { UserContext } from "../providers/UserProvider";


function Application() {
  // Asigna un user para leer el contexto actual.
  // React encontrará el Provider superior más cercano 
  // y usará su valor.
  const user = useContext(UserContext);
  console.log(" Usuario Application : " + user);

  return (
    user ? <Home/>  // true
      : // false
      <Router> 
          <SignIn path="/" />      
          <SignUp path="signUp" />
      </Router>
  );
}

export default Application;
