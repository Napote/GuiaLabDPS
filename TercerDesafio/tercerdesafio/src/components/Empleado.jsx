
import React, { useState, useEffect } from 'react'

import Estadisticas from '../components/Estadisticas';
import ListaEmpleados from './ListaEmpleados.jsx'; 
import FormularioEmpleado from './FormularioEmpleado';

import { toast } from "react-toastify";
import {db} from "../Firebase"; 

export const IdContext = React.createContext();

const Empleado = () => {    

    const [idSeleccionado, setIdSeleccionado] = useState('');
 
    return (
          
        <div className="container py-4 px-0">
            <div className="row py-4">                             
                <h2>Directorio de empleados</h2> 
            </div>
            
            <div className="row">     
                <IdContext.Provider value={{ idSeleccionado , setIdSeleccionado }}>
                    <div className="col-md-8 pr-4"> 
                        <ListaEmpleados/>
                    </div>
                    <div className="col-md-4 ">
                        <FormularioEmpleado/>
                    </div>                
                </IdContext.Provider>
            </div>
        </div>
    );
};

export default Empleado;

