import React, {useState, useEffect} from 'react';
import Route from 'react-router-dom/Route';
import 'bootswatch/dist/yeti/bootstrap.min.css';  

import Home from './pages/Home';
import Login from './pages/Login';

import {Link} from 'react-router-dom'

function App() {
  return (
    <>     
      <Route path="/" component={Home}/>
      <Route path="/signin" component={Login}/> 
    </>
  );
}

export default App;
