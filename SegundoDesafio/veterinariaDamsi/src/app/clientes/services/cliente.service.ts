import { Injectable } from '@angular/core';
//Firebase
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
//Modelo
import { Cliente } from '../../assets/models/cliente';

const ESCAPE_KEYCODE = 27;


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  datosFirebase:AngularFireList<any>;

  /*El cliente que se ha seleccionado de la tabla */
  abiertoEdicion=false;
  /*Se guardan los datos del cliente */
  clienteSeleccionado:Cliente = new Cliente();




  constructor(private firebase:AngularFireDatabase) { }

    //Trae todos los clientes registrados en la base de datos
    //Guarda los elementos en la variable clientes
    obtenerClientes(){
      return this.datosFirebase = this.firebase.list('clientes');
    }


   

  
   
    //Crea un nuevo cliente, recibe como parametro un objeto Cliente
    crearCliente(cliente:Cliente){
      this.datosFirebase.push({ 
        dui: cliente.dui,
        nombre: cliente.nombre,
        mascota: cliente.mascota,
        numerovisitas:0
      });
    }

    //Cancelar seleccion de tabla 

    cancelarSeleccion(){
      this.abiertoEdicion=false;            
      this.clienteSeleccionado=new Cliente(); 
    }
 
    //Actualiza los datos de un cliente
    actualizarCliente(){  
      return this.datosFirebase.update(this.clienteSeleccionado.id,{
      nombre: this.clienteSeleccionado.nombre,
      mascota: this.clienteSeleccionado.mascota,
      })   
    }

    //Eliminar un cliente, no devuelve nada
    eliminarCliente( ) { 
      this.datosFirebase.remove(this.clienteSeleccionado.id); 
      this.cancelarSeleccion();
    } 

}
