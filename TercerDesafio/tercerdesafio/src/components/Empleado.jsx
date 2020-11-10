
import React, { useState, useEffect } from 'react'

import Estadisticas from '../components/Estadisticas';
import ListaEmpleados from './ListaEmpleados.jsx'; 
import FormularioEmpleado from './FormularioEmpleado';

import { toast } from "react-toastify";
import {db} from "../Firebase"; 

export const IdContext = React.createContext();

const Empleado = () => {    

    const [idSeleccionado, setIdSeleccionado] = useState('');
    
    const eliminarEmpleado = async (id, codigo) => {
        if (window.confirm("Esta acción eliminara permanentemente el registro. ¿Desea continuar?")) {
          await db.collection("Empleados").doc(id).delete();
          await db.collection("codigosEmpleado").doc(codigo).delete();
          toast("Registro eliminado.", {
            type: "error",
            //autoClose: 2000
          });
        
        cancelarSeleccion();
    }};


    const crearOActualizarEmpleado = (EmpleadoObjeto) => { 
      if (idSeleccionado === "")         
        crearEmpleado(EmpleadoObjeto);
      else 
        actualizarEmpleado(EmpleadoObjeto)
         
    }; 

    //Funcion que crea un empleado en firestore
    const crearEmpleado = async (EmpleadoObjeto) => { 
      try{                
        const querySnapshot = db.collection('Empleados').doc();             
        await db.collection("Empleados").doc(querySnapshot.id).set(EmpleadoObjeto);   
        await db.collection("codigosEmpleado").doc(EmpleadoObjeto.codigo).set({
          uid:querySnapshot.id
        });

       toast("Se ha creado un nuevo registro. Código de empleado E-"+EmpleadoObjeto.codigo+".", {
          type: "success",
        });

      }catch(error){
        console.log(error)
      } 
    }


    const actualizarEmpleado = async (EmpleadoObjeto) =>{
      try{ 
        await db.collection("Empleados").doc(idSeleccionado).update(EmpleadoObjeto);
        toast("Se han actualizado los datos del empleado " + EmpleadoObjeto.nombre, {
          type: "info",
        });
        cancelarSeleccion();     
      }catch(error){
        console.log(error)
      } 
    } 

    const cancelarSeleccion = () => {
      setIdSeleccionado("");
    }


    //TODO: Inseguro, por aqui jackean el programa bien feo
  
  

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

