import React, { useState, useEffect, useContext } from 'react'
import { db } from "../Firebase";


import { IdContext } from "./Empleado";


const FormularioEmpleado = (props) => {

    const valoresPorDefecto = {
        codigo: "",
        nombre: "",
        horas: 0
    };

    const context = React.useContext(IdContext);
    
    const [values, setValues] = useState(valoresPorDefecto);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();    
        props.crearOEditarEmpleado(values);
        setValues({ ...valoresPorDefecto });
    };

    const recuperarEmpleadoPorId = async (id) => {
        const doc = await db.collection("Empleados").doc(id).get();
        setValues({ ...doc.data() });
    };

    useEffect(() => {
        if (context.idSeleccionado === "") {
          setValues({ ...valoresPorDefecto });
        } else { 
          if (context.idSeleccionado !== null && context.idSeleccionado !== undefined) {
            recuperarEmpleadoPorId(context.idSeleccionado);
          }
        } 
      }, [context.idSeleccionado]);

    return (
        <form onSubmit={handleSubmit} className="card card-body border-primary">
          <h5 className="py-3 text-center">
            {context.idSeleccionado === "" ? "NUEVO REGISTRO" : "ACTUALIZAR REGISTRO"}           
          </h5>
          <div className="form-group">
            <label>Código de empleado</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">E-</span>
              </div>
              <input type="number" className="form-control" placeholder="000" value={values.codigo} name="codigo" onChange={handleInputChange}/>
          
            </div>
          </div>  
          
          <div className="form-group">
            <label>Nombre del empleado</label>
            <input type="text" className="form-control" placeholder="Juan Perez" value={values.nombre} name="nombre" onChange={handleInputChange}/>
          </div>  
          <div className="form-group">
            <label>Horas trabajadas en el mes</label>
            <input type="number" className="form-control"  value={values.horas} name="horas" onChange={handleInputChange}/>
          </div>   
      <button className="btn btn-primary btn-block">
        {context.idSeleccionado === "" ? "Agregar a directorio" : "Guardar cambios"}
      </button>
    </form>
    );    
};

export default FormularioEmpleado; 

