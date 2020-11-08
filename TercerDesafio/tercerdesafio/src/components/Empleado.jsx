
import React, { useState, useEffect } from 'react'

import Estadisticas from '../components/Estadisticas';
import ListaEmpleados from './ListaEmpleados.jsx'; 
import FormularioEmpleado from './FormularioEmpleado';

import { toast } from "react-toastify";
import {db} from "../Firebase"; 

export const IdContext = React.createContext();

const Empleado = () => {    

    const [idSeleccionado, setIdSeleccionado] = useState('');
    
    const eliminarEmpleado = async (id) => {
        if (window.confirm("Esta acción eliminara permanentemente el registro. ¿Desea continuar?")) {
          await db.collection("Empleados").doc(id).delete();
          toast("Registro eliminado.", {
            type: "error",
            //autoClose: 2000
          });
        }
    };


    const crearOActualizarEmpleado = async (EmpleadoObjeto) => {
        try {
          if (idSeleccionado === "") {
            await db.collection("Empleados").doc().set(EmpleadoObjeto);
            toast("Se ha creado un nuevo registro. Código de empleado E-"+EmpleadoObjeto.codigo+".", {
              type: "success",
            });
          } else {
            await db.collection("Empleados").doc(idSeleccionado).update(EmpleadoObjeto);
            toast("Se han actualizado los datos del empleado " + EmpleadoObjeto.nombre, {
              type: "info",
            });
            setIdSeleccionado("");
          }
        } catch (error) {
          console.error(error);
        }
    };

    const cancelarSeleccion = () => {
      setIdSeleccionado("");
    }

    return (
          
        <div className="container py-4 px-0">           

            <div className="row">     
                <IdContext.Provider value={{ idSeleccionado , setIdSeleccionado }}>
                    <div className="col-md-8 pr-4">     
                        <ListaEmpleados {...{eliminarEmpleado}}/>  
                        <h2 className="py-2">Estadisticas</h2>   
                        <Estadisticas/>     
                    </div>
                    <div className="col-md-4 py-4"  > 
                        <FormularioEmpleado {...{crearOActualizarEmpleado, cancelarSeleccion}} /> 
                    </div>             

                 
                </IdContext.Provider>
            </div>
        </div>
    );
};

export default Empleado;

