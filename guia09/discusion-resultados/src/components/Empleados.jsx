import React, { useEffect, useState } from "react";
import EmpleadoForm from "./EmpleadoForm";

import { db } from "../Firebase";
import { toast } from "react-toastify";

const Empleados=() =>{

    const [Empleados, asignarEmpleados] = useState([]);
    const [idSeleccionado, asignaridSeleccionado] = useState("");

    const obtenerEmpleados = async () => {
        db.collection("Empleados").onSnapshot((querySnapshot) => {
          const docs = [];
          querySnapshot.forEach((doc) => {
            docs.push({ ...doc.data(), id: doc.id });
          });
          asignarEmpleados(docs);
        });
    };

    const eliminarEmpleado = async (id) => {
        if (window.confirm("Esta seguro que desea borrar este empleado? No podra deshacer esta acción.")) {
          await db.collection("Empleados").doc(id).delete();
          toast("Se elimino un empleado", {
            type: "error",
            //autoClose: 2000
          });
        }
    };

    //TODO: Me imagino que esto hace algo al renderizar Empleados
    useEffect(() => {
        obtenerEmpleados();
    }, []);

    const crearOEditarEmpleado = async (EmpleadoObjeto) => {
        try {
          if (idSeleccionado === "") {
            //Si no hay un id seleccionado entonces se crea un empleado
            await db.collection("Empleados").doc().set(EmpleadoObjeto);
            toast("Se agrego un empleado", {
              type: "success",
            });
          } else {
            //De lo contrario se actualizan los datos utilizando el id seleccionado
            await db.collection("Empleados").doc(idSeleccionado).update(EmpleadoObjeto);
            toast("Se actualizo un empleado", {
              type: "info",
            });
            asignaridSeleccionado("");
          }
        } catch (error) {
          console.error(error);
        }
    }; 
    
    return(
        <>  
        <div className="col-md-4 p-2">
            <h2>Agregar un empleado</h2>
            <EmpleadoForm {...{ crearOEditarEmpleado, idSeleccionado, Empleados }} />
        </div>
        
        
        <div className="col-md-8 p-2">
            <div className="container">
                <h2>Lista de empleados</h2>
                {/*Tabla de empleados*/}
                <table className="table table-hover">            
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Cargo</th>
                            <th>Aciones disponibles</th>
                        </tr>
                    </thead>
                <tbody>
                    {Empleados.map((Empleado) => (
                    <tr key={Empleado.id}>
                        <td>{Empleado.nombre}</td>
                        <td>{Empleado.apellido}</td>
                        <td>{Empleado.cargo}</td>
                        <td>
                            <button className="btn btn-primary" onClick={() => asignaridSeleccionado(Empleado.id)}>Editar</button>
                            &nbsp;
                            &nbsp;
                            <button className="btn btn-danger" onClick={() => eliminarEmpleado(Empleado.id)}>Eliminar</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>

    </>
    );


};


export default Empleados;