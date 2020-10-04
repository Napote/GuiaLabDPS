import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {HostListener} from '@angular/core';

//Servicio
import { ProductoService } from '../../services/producto.service';

//Validacion de formularios
import { FormGroup, FormControl, Validators } from '@angular/forms';


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
        this.productoServicio.crearProducto(producto);        
    }
   
     //actualiza la informacion del producto
    actualizar(){ 
      this.productoServicio.actualizarProducto();
      this.productoServicio.cancelarSeleccion(); 
    }

    //Envia el cliente para su eliminacion
    eliminar(){ 
      this.productoServicio.eliminarProducto();
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent): void {   
      if (event.key === 'Escape') {
        this.productoServicio.cancelarSeleccion();
        
      }  
      
    }

    

}
