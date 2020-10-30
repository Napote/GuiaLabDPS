//Deberán de replicar el siguiente ejercicio, 
//pero para la tabla empleado (id, nombre, apellido, cargo), 
//deben de colocarlo en un hosting.

import React from 'react';
import './App.css';


import Empleado from "./components/Empleados";

import {ToastContainer} from 'react-toastify';

function App() {
  return (
    <div className="container p-4">
      <div className="row">
        <Empleado />
      </div>
      <ToastContainer />
    </div> 
  );
}

export default App;
