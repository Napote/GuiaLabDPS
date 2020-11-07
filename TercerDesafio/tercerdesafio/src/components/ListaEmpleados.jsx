import React from 'react'
import {useEffect, useState, useContext } from "react";

import { db } from "../Firebase"; 

import { IdContext } from "./Empleado";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'; 
import { faPenAlt } from '@fortawesome/free-solid-svg-icons';

const ListaEmpleados = () => {

    const [Empleados, setEmpleados] = useState([]);
    const { setIdSeleccionado } = useContext(IdContext);

    const recuperarEmpleados = async () => {
        db.collection("Empleados").onSnapshot((querySnapshot) => {
          const docs = [];
          querySnapshot.forEach((doc) => {
            docs.push({ ...doc.data(), id: doc.id });
          });
          setEmpleados(docs);
        });
    };

    useEffect(() => {
        recuperarEmpleados();
    }, []);     

    return (
        <div className="table-responsive"> 
            <table className="table table-hover" >            
                <thead>
                    <tr className="text-center">
                        <th>Código</th>
                        <th>Empleado</th>
                        <th>Horas</th>
                        <th>Sueldo neto</th>
                        <th colspan="2" >Aciones disponibles</th>
                    </tr>
                </thead>
                <tbody>
                  {Empleados.map((Empleado) => (
                    <tr key={Empleado.id}>
                      <td>E-{Empleado.codigo}</td>
                      <td>{Empleado.nombre}</td>
                      <td>{Empleado.horasMes} horas</td>
                      <td>$ {Empleado.sueldoNeto} </td> 
                      <td>  
                        <button className="btn btn-info mr-2" id="show-report-btn"> Reporte</button> 
                        <button className="btn btn-primary mx-1" id="edit-btn" onClick={() => setIdSeleccionado(Empleado.id)}> 
                          <FontAwesomeIcon icon={faPenAlt}/>
                        </button>  
                        <button className="btn btn-danger" id="delete-btn">
                          <FontAwesomeIcon icon={faTrash}/>
                        </button> 
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
    )
}

export default  ListaEmpleados; 