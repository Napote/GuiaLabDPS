import React, { useState, useEffect } from "react";
import { db } from "../Firebase"; 

const EmpleadoForm = (props) => {

    //Los valores por defecto del formulario
    const valoresIniciales = {
        nombre: "",
        apellido: "",
        cargo: "",
      };
    
    //Utilizando valores iniciales
    const [values, setValues] = useState(valoresIniciales);
    
    //Manejando eventos de inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    //Manejando evento submit
    const handleSubmit = (e) => {
        e.preventDefault();    
        props.crearOEditarEmpleado(values);
        setValues({ ...valoresIniciales });
    };

    //Recuperando un empleado de la coleccion utilizando su id
    const obtenerEmpleadoExistente = async (id) => {
        const doc = await db.collection("Empleados").doc(id).get();
        setValues({ ...doc.data() });
    };

    //
    useEffect(() => {
        if (props.idSeleccionado === "") {
          setValues({ ...valoresIniciales });
        } else { 
          if (props.idSeleccionado !== null && props.idSeleccionado !== undefined) {
            obtenerEmpleadoExistente(props.idSeleccionado);
          }
        } 
      // eslint-disable-next-line
      }, [props.idSeleccionado]); 

    return(
        <form onSubmit={handleSubmit} className="card card-body border-primary">
            {/*Nombre*/}
            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="material-icons">Nombre</i>
                </div>
                <input type="text" className="form-control" placeholder="Nombre" value={values.nombre} name="nombre" onChange={handleInputChange}/>
            </div>
            {/*EOF Nombre*/}

            {/*Apellido*/}
            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="material-icons">Apellido</i>
                </div>
                <input type="text" value={values.apellido} name="apellido" placeholder="Apellido" className="form-control" onChange={handleInputChange}/>
            </div>
             {/*EOF Apellido*/}

            {/*Cargo*/}
            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="material-icons">Cargo</i>
                </div>
                <input type="text" value={values.cargo} name="cargo" placeholder="Cargo administrativo" className="form-control" onChange={handleInputChange}/>
            </div>
             {/*EOF Cargo*/}

            <button className="btn btn-primary btn-block">
                {props.idSeleccionado === "" ? "Guardar" : "Actualizar"}
            </button>
        </form>
    ); 
};

export default EmpleadoForm;
