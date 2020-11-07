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
                //console.log(doc.id, ' => ', doc.data());   
                setMaximo({ ...doc.data() });        
              });
        }) 
        referencia.orderBy("sueldoNeto","asc").limit(1).onSnapshot((querySnapshot) =>{
            querySnapshot.forEach((doc) => {  
                setMinimo({ ...doc.data() });    
              });
        }) 
    };

    useEffect(() => {
        recuperarEmpleados();
    }, []);   

    
    return ( 
        <> 
        <h2 className="py-2">Estadisticas</h2>   
        <div className="row">   
            <div className="col-md-5">
                <div className="counter">
                    <i className="fa fa-code fa-2x"></i>
                    <h2 className="timer count-title count-number">
                        ${(Math.round(mayorSalario.sueldoNeto * 100) / 100).toFixed(2)}  
                    </h2>
                    <p className="count-text ">Mejor salario</p>
                </div>
            </div>   
            <div className="col-md-5">
                <div className="counter"> 
                    <h2 className="timer count-title count-number">
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
    