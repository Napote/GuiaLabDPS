import React, { useState, useEffect } from 'react'
import { db } from "../Firebase";
 
import { IdContext } from "./Empleado";
import {ValidacionCampos, validarCampos} from "./validation";

const FormularioEmpleado = (props) => {
    
    const ISSS = 0.0525;
    const AFP = 0.0688;
    const RENTA = 0.1;  

    const valoresPorDefecto = {
        codigo: "",
        nombre: "",
        horasMes: 1,
        sueldoNeto: 0
    };  

    const mensajesError= {
      codigo: '',
      nombre: '',
      horasMes: '',
    };


    const context = React.useContext(IdContext);
    
    const [values, setValues] = useState(valoresPorDefecto);
    const [log, setErrors] = useState(mensajesError);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let errores = mensajesError;
        switch(name){
          case 'nombre':
            errores.nombre =validarCampos.validarNombre(value);
          break;
          case 'codigo':
            errores.codigo = validarCampos.validarCodigo(value);
          break;          
          case 'horasMes':
            errores.horasMes = validarCampos.validarHoras(value);
          break;
          default:
            break;
        }
        setErrors({...errores}) 
        
        setValues({ ...values, [name]: value });  
      
    };
 

    const handleSubmit = (e) => {        
       
        e.preventDefault();              
        if(!validarCampos.validarFormulario(log)) 
          return; 

        calcularSueldoNeto();
        props.crearOActualizarEmpleado(values); 
        setValues({ ...valoresPorDefecto });
    };

    const handleBlur = (e) => {
      const { name, value } = e.target;
      if(value)
        props.comprobarCodigoUnico(value);
    }
 

    const calcularSueldoNeto = () =>{
      let sueldoLiquido;

      if(values.horasMes - 160 <= 0)
        sueldoLiquido= values.horasMes*(9.75);  
      else if (values.horasMes - 200 <= 0)
        sueldoLiquido= values.horasMes*(11.50) - 280; 
      else 
        sueldoLiquido= values.horasMes*(12.50) - 480; 

      let descuentoISSS = sueldoLiquido*ISSS;
      let descuentoAFP = sueldoLiquido*AFP;
      let descuentoRenta = sueldoLiquido*RENTA;

      values.sueldoNeto = sueldoLiquido - (descuentoAFP + descuentoISSS + descuentoRenta);

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
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">E-</span>
              </div>
              <input 
                type="number" 
                className="form-control" 
                placeholder="000" 
                value={values.codigo} 
                name="codigo" 
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
                /> 
                
            </div>
            <span className='invalid-feedback' style={{display: log.codigo ? 'block' : 'none' }}>{log.codigo}</span>
          </div>  
          
          <div className="form-group">
            <label> Nombre del empleado</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Juan Perez" 
              value={values.nombre} 
              name="nombre" 
              onChange={handleInputChange}
              required
            />            
             
            <span className='invalid-feedback' style={{display: log.nombre ? 'block' : 'none' }}>{log.nombre}</span>
            
          </div>  

          <div className="form-group">
            <label>Horas trabajadas en el mes</label> 
            <input 
              type="number" 
              className="form-control"  
              value={values.horasMes} 
              name="horasMes" 
              onChange={handleInputChange}  
              required
            />

              <span className='invalid-feedback' style={{display: log.horasMes ? 'block' : 'none' }}>{log.horasMes}</span>
          </div>   

          <button className="btn btn-primary btn-block my-1">
            {context.idSeleccionado === "" ? "Agregar a directorio" : "Guardar cambios"}
          </button> 

          {context.idSeleccionado && 
            <button 
              type="button" 
              className="btn btn-outline-secondary my-2 " 
              onClick={() =>  props.cancelarSeleccion()} >            
              Cancelar
            </button>
          }  

    </form>
    );    
};

export default FormularioEmpleado; 

