import { Injectable } from '@angular/core';
 
//Firebase
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
//Modelo
import { Cliente } from '../../assets/models/cliente';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  datosFirebase:AngularFireList<any>;

  /*El cliente que se ha seleccionado de la tabla */
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
 
  //Actualiza los datos de un cliente
  actualizarAlumno(cliente:Cliente){
    //Utilizo el metodo update de firebase, enviando la llave y los datos a actualizar
    this.datosFirebase.update(cliente.dui,{
      nombre: cliente.nombre,
      mascota: cliente.mascota,
    })
  }

  //Eliminar un cliente

  eliminarAlumno(dui:string){
    this.datosFirebase.remove(dui);
  }




}
