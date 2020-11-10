
import React, { useState, useEffect } from 'react'

import Estadisticas from '../components/Estadisticas';
import ListaEmpleados from './ListaEmpleados.jsx'; 
import FormularioEmpleado from './FormularioEmpleado';

//Importanto componentes para crear ventanas modales de Reactstrap
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import { toast } from "react-toastify";

import {db} from "../Firebase"; 

export const IdContext = React.createContext();

const Empleado = () => {    

    const [modalReporte, setModalReporte]= useState(false);

    const [idSeleccionado, setIdSeleccionado] = useState('');

    const [datosReporte, setDatosReporte] = useState('');

    const abrirCerrarModalReporte=()=>{
      setModalReporte(!modalReporte);
    }

    const mostrarReporte =  async (EmpleadoObjeto) => {
      setDatosReporte(EmpleadoObjeto);
      abrirCerrarModalReporte();
    }

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

    //Funcion que actualiza un empleado
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

    //Cancela la seleccion edicion
    const cancelarSeleccion = () => {
      setIdSeleccionado("");
    } 

    return (           
        <div className="container py-4 px-0">      
            <div className="row">     
                <IdContext.Provider value={{ idSeleccionado , setIdSeleccionado }}>
                    <div className="col-md-8 pr-4">     
                        <ListaEmpleados {...{eliminarEmpleado, mostrarReporte}}/>  
                        <h2 className="py-2">Estadisticas</h2>   
                        <Estadisticas/>     
                    </div>
                    <div className="col-md-4 py-4"  > 
                        <FormularioEmpleado {...{crearOActualizarEmpleado, cancelarSeleccion}} /> 
                    </div>                              
                </IdContext.Provider>
            </div>


            <Modal isOpen={modalReporte}>   
                <ModalBody>
                  <div className="card">                    
                    <div className="card-header">
                      <strong>REPORTE DE SUELDO</strong> 

                    </div>                    
                    <div className="card-body">
                      <div className="row mb-4">
                        <div className="col-sm-10"> 
                          <div>
                            <strong>E-{datosReporte.codigo}</strong>
                          </div>
                          <div>
                            <strong>{datosReporte.nombre}</strong> 
                          </div> 
                        </div>
                      </div>   
                        <table className="table table-clear table-responsive mb-0">
                            <tbody>
                                <tr>
                                    <td className="left col-md-5">Sueldo Liquido</td>
                                    <td className="right">${datosReporte.sueldoLiquido}</td>
                                </tr>
                                <tr>
                                    <td className="left">ISSS</td>
                                    <td className="right">
                                      -${datosReporte && (datosReporte.sueldoLiquido*0.0525).toFixed(2)} 
                                    </td>
                                </tr>
                                <tr>
                                    <td className="left">AFP</td>
                                    <td className="right">
                                      -${datosReporte && (datosReporte.sueldoLiquido*0.0688).toFixed(2)}  
                                    </td>
                                </tr>
                                <tr>
                                    <td className="left">RENTA</td>
                                    <td className="right">
                                      -${datosReporte && (datosReporte.sueldoLiquido*0.1).toFixed(2)}  
                                    </td>
                                </tr>
                                <tr>
                                    <td className="left">
                                        <strong>TOTAL</strong>
                                    </td>
                                    <td className="right">
                                      <strong>
                                       ${datosReporte && (datosReporte.sueldoNeto).toFixed(2)} 
                                      </strong>
                                    </td>
                                </tr>                                
                            </tbody>                            
                        </table>          
                        <div class="col-md-12 text-center"> 
                          <button className="btn btn-danger" onClick={()=>abrirCerrarModalReporte()}>Cerrar reporte</button> </div>
                        </div> 
                  </div> 
                </ModalBody> 
            </Modal>

        </div> 


    );
};

export default Empleado;

