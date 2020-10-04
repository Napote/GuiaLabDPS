import { Injectable } from '@angular/core';
//Firebase
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
//Modelo
import { Medicamentos } from '../models/medicamentos';

const ESCAPE_KEYCODE = 27;

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  datosFirebase:AngularFireList<any>;

  /*El cliente que se ha seleccionado de la tabla */
  abiertoEdicion=false;
  /*Se guardan los datos del cliente */
  productoSeleccionado:Medicamentos= new Medicamentos();



  constructor(private firebase:AngularFireDatabase) { }
 
    obtenerProductos(){      
      return this.datosFirebase = this.firebase.list('productos');
    }
 
    crearProducto(producto:Medicamentos){
      this.productoSeleccionado=new Medicamentos();
      return this.datosFirebase.push({          
          nombre: producto.nombre,
          precio: producto.precio,
          checked: "false"
      });
    }

    //Cancelar seleccion de tabla 

    cancelarSeleccion(){
      this.abiertoEdicion=false;            
      this.productoSeleccionado=new Medicamentos(); 
    }
 
    actualizarProducto(){  
      return this.datosFirebase.update(this.productoSeleccionado.id,{
        nombre: this.productoSeleccionado.nombre,
        precio: this.productoSeleccionado.precio
      })   
    } 

    eliminarProducto( ) { 
      this.datosFirebase.remove(this.productoSeleccionado.id); 
      this.cancelarSeleccion();
    } 




}
 