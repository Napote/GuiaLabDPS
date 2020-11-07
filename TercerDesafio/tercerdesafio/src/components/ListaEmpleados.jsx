import React from 'react'
import {useEffect, useState } from "react";

import { db } from "../Firebase";
import { toast } from "react-toastify"; 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'; 
import { faPenAlt } from '@fortawesome/free-solid-svg-icons';

import {FormularioEmpleado} from './FormularioEmpleado';

export default function ListaEmpleados() {

    const [Empleados, setEmpleados] = useState([]);


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
        <div> 
            <table class="table table-hover">            
                <thead>
                    <tr>
                        <th>Empleado</th>
                        <th>Horas mensuales</th>
                        <th>Sueldo neto</th>
                        <th colspan="2" >Aciones disponibles</th>
                    </tr>
            </thead>
            <tbody>
              {Empleados.map((Empleado) => (
                <tr key={Empleado.id}>
                  <td>{Empleado.nombre}</td>
                  <td>{Empleado.horasMes} horas</td>
                  <td>$ {Empleado.sueldoNeto} </td>
                  <td> 
                    <button className="btn btn-info">Reporte</button> 
                  </td>
                  <td> 
                    <button className="btn btn-primary mx-1"> 
                        <FontAwesomeIcon icon={faPenAlt}/>
                    </button> 
                    <button className="btn btn-danger">
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
