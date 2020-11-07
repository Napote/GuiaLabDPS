import React, { useEffect, useState } from "react";
import { Component } from 'react'  

import Estadisticas from '../components/Estadisticas';
import ListaEmpleados from './ListaEmpleados.jsx'; 

import { toast } from "react-toastify";
import {db} from "../Firebase";

export default function Empleado() {
    return (
        <>
        <div className="container py-4 px-0">
            <div className="row py-4">                             
                <h2>Directorio de empleados</h2> 
            </div>

            <div className="row">              
                <div className="col-md-8"> 
                    <ListaEmpleados/>
                </div>
                <div className="col-md-4">
                    <Estadisticas/>
                </div>
            </div>

        </div>
        </>
    )
}

