import React, {useState, useEffect} from 'react';
//Importando Boostrap
import 'bootstrap/dist/css/bootstrap.min.css';
//Importanto componentes para crear ventanas modales de Reactstrap
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
//Importando axios
import axios from 'axios';


function App() {
  //URL de api
  //Hosteada en 000wbhostapp
  const baseUrl="https://unfatherly-colons.000webhostapp.com/";


  const [data, setData]=useState([]);
  const [modalInsertar, setModalInsertar]= useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  //Este estado es un arreglo
  const [productoSeleccionado, setProductoSeleccionado]=useState({
    id: '',
    nombre: '',
    existencias: '' 
  });

  const handleChange=e=>{
    const {name, value}=e.target;
    setProductoSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }))
    console.log(productoSeleccionado);
  }

  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  const peticionGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }
  const peticionPost=async()=>{
    var f = new FormData();
    f.append("nombre", productoSeleccionado.nombre);
    f.append("existencias", productoSeleccionado.existencias); 
    f.append("METHOD", "POST");
    await axios.post(baseUrl, f)
    .then(response=>{
      setData(data.concat(response.data));
      abrirCerrarModalInsertar();
    }).catch(error=>{
      console.log(error);
    })
  }
  const peticionPut=async()=>{
    var f = new FormData();
    f.append("nombre", productoSeleccionado.nombre);
    f.append("existencias", productoSeleccionado.existencias); 
    f.append("METHOD", "POST");
    await axios.post(baseUrl, f, {params: {id: productoSeleccionado.id}})
    .then(response=>{
      var dataNueva= data;
      dataNueva.map(producto=>{
        if(producto.id===productoSeleccionado.id){
          producto.nombre=productoSeleccionado.nombre;
          producto.existencias=productoSeleccionado.existencias; 
        }
      });
      setData(dataNueva);
      abrirCerrarModalEditar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionDelete=async()=>{
    var f = new FormData();
    f.append("METHOD", "DELETE");
    await axios.post(baseUrl, f, {params: {id: productoSeleccionado.id}})
    .then(response=>{
      setData(data.filter(producto=>producto.id!==productoSeleccionado.id));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
    })
  }
  const seleccionarProducto=(producto, caso)=>{
    setProductoSeleccionado(producto);

    (caso==="Editar")?
    abrirCerrarModalEditar():
    abrirCerrarModalEliminar()
  }

  useEffect(()=>{
    peticionGet();
  },[])

  

  return (
    
      <div style={{textAlign: 'center'}}> 
        <button className="btn btn-success my-4 " onClick={()=>abrirCerrarModalInsertar()}>Nuevo producto</button> 
        <table className="table table-striped" style={{textAlign: 'center'}}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Existencias</th> 
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map(producto=>(
              <tr key={producto.id}>
                <td>{producto.id}</td>
                <td>{producto.nombre}</td>
                <td>{producto.existencias}</td> 
                <td>
                  <button className="btn btn-primary" onClick={()=>seleccionarProducto(producto, "Editar")}>Editar</button> {"  "}
                  <button className="btn btn-danger" onClick={()=>seleccionarProducto(producto, "Eliminar")}>Eliminar</button>
                </td>
              </tr>
            ))} 
          </tbody>     
        </table>
    
    
        <Modal isOpen={modalInsertar}>
          <ModalHeader>Insertar producto</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>Producto: </label>
              <br />
              <input type="text" className="form-control" name="nombre" onChange={handleChange}/>
              <br />
              <label>Existencias: </label>
              <br />
              <input type="number" className="form-control" name="existencias" onChange={handleChange}/>
              <br /> 
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={()=>peticionPost()}>Insertar</button>{"   "}
            <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
          </ModalFooter>
        </Modal>
    
    
        
        <Modal isOpen={modalEditar}>
          <ModalHeader>Editar producto</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>Nombre: </label>
              <br />
              <input type="text" className="form-control" name="nombre" onChange={handleChange} value={productoSeleccionado && productoSeleccionado.nombre}/>
              <br />
              <label>Existencias: </label>
              <br />
              <input type="number" className="form-control" name="existencias" onChange={handleChange} value={productoSeleccionado && productoSeleccionado.existencias}/>
              <br /> 
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={()=>peticionPut()}>Editar</button>{"   "}
            <button className="btn btn-danger" onClick={()=>abrirCerrarModalEditar()}>Cancelar</button>
          </ModalFooter>
        </Modal>
    
        <Modal isOpen={modalEliminar}>
            <ModalBody>
            ¿Estás seguro que deseas eliminar el producto {productoSeleccionado && productoSeleccionado.nombre}?
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={()=>peticionDelete()}>
                Sí
              </button>
              <button
                className="btn btn-secondary"
                onClick={()=>abrirCerrarModalEliminar()}
              >
                No
              </button>
            </ModalFooter>
          </Modal>
    
        </div>
  );
}

export default App;
