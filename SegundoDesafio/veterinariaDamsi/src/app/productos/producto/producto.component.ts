import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {HostListener} from '@angular/core';

//Servicio
import { ProductoService } from '../../services/producto.service';

//Validacion de formularios
import { FormGroup, FormControl, Validators } from '@angular/forms';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {


  //Formulario de productos
  productoForm = new FormGroup({      
    nombre: new FormControl(''),
    precio: new FormControl('') 
  });


  constructor(public productoServicio:ProductoService) { }

  ngOnInit(): void {
  }

     
    //Añade el producto a la bd
    onSubmit(productoForm:NgForm){ 
        let producto= this.productoServicio.productoSeleccionado;
        
        Swal.fire({
          title: '¿Agregar un nuevo producto?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#606ED7',
          confirmButtonText: 'Sí, Agregar'
        }).then(result => {
          if(result.value){
            Swal.fire({
              title: 'Cargando...',
              didOpen(){
                Swal.showLoading();
              }
              //si
            })//.then(result => {
              this.productoServicio.crearProducto(producto).then(result =>{
            Swal.fire('¡Producto Guarado!', 'Se ha guardado la información del producto', 'success')
            //})
          }).catch((error) => {
              Swal.fire({
                title: 'Error!',
                text: 'No se pudo guardar',
                icon:'error'
              })
            })
          }
          else{
            Swal.fire({
              position: 'top-end',
              title: 'Acción Cancelada...',
              text: `Acción crear nuevo producto cancelada`,
              icon: 'info',
              heightAuto:true,
              timer: 2000,
              timerProgressBar: true
          });
          }
          });
        //this.productoServicio.crearProducto(producto);        
    }
   
     //actualiza la informacion del producto
    actualizar(){ 
      Swal.fire({
        title: 'Cargando...',
        didOpen(){
          Swal.showLoading()
        },
        didClose (){
          Swal.hideLoading()
        }
      });
      this.productoServicio.actualizarProducto().then(result =>{
        Swal.fire('¡Información actualizada!', 'Los datos se han actualizado con exito', 'success');
      });
      
      this.productoServicio.cancelarSeleccion(); 
    }

    //Envia el cliente para su eliminacion
    eliminar(){ 
      Swal.fire({
        title: '¿Está seguro que desea eliminar el producto seleccionado?',
        text: `¡Esta acción no se puede deshacer!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#606ED7',
        confirmButtonText: 'Sí, eliminar'
      }).then(result => {
        if(result.value){
          this.productoServicio.eliminarProducto(); 
          Swal.fire('¡Producto Elimiando!', 'El producto se ha eliminado con exito', 'success');
        }
      }) 
      
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent): void {   
      if (event.key === 'Escape') {
        this.productoServicio.cancelarSeleccion();
        
      }  
      
    }

    

}
