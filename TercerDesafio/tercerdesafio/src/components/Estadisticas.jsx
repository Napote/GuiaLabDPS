import React from 'react'
import { db } from "../Firebase";  
import './Estadisticas.css';
import {useEffect, useState} from "react"; 


 const Estadisticas = (props) => {
 
    const mejor = {
        codigo: "-",
        nombre: "-",
        horasMes: 0,
        sueldoNeto: 0 
    }; 

    const peor = {
        codigo: "-",
        nombre: "-",
        horasMes: 0,
        sueldoNeto: 0 
    }; 

    const [mayorSalario, setMaximo] = useState(mejor);
    const [menorSalario, setMinimo] = useState(peor);

    const recuperarEmpleados = async () => { 
        var referencia = db.collection("Empleados");

        referencia.orderBy("sueldoNeto","desc").limit(1).onSnapshot((querySnapshot) =>{
            querySnapshot.forEach((doc) => { 
                if(doc.exists)
                    setMaximo({ ...doc.data() }); 
              });
        }) 
        referencia.orderBy("sueldoNeto","asc").limit(1).onSnapshot((querySnapshot) =>{
            querySnapshot.forEach((doc) => {  
                if(doc.exists)
                    setMinimo({ ...doc.data() });    
              });
        }) 
    };

    useEffect(() => {
        recuperarEmpleados();
    }, []);   

    
    return ( 
        <> 
        <br/>
        <div className="row">   
            <div className="col-md-5">
                <div className="counter">
                    <h6 className="text-center">
                        {mayorSalario.nombre}
                    </h6>
                    <h2 className="timer count-title count-number">
                        ${(Math.round(mayorSalario.sueldoNeto * 100) / 100).toFixed(2)}  
                    </h2>
                    <p className="count-text">Mejor salario</p>
                </div>
            </div>   
            <div className="col-md-5">
                <div className="counter"> 
                    <h6 className="text-center">
                        {menorSalario.nombre}
                    </h6>
                    <h2 className="timer count-title count-number" >
                        ${(Math.round(menorSalario.sueldoNeto * 100) / 100).toFixed(2)}  
                    </h2>
                    <p className="count-text ">Peor salario</p>
                </div>
            </div>     
        </div>
            
            
        </>
    ) 

}
 
export default Estadisticas;
    