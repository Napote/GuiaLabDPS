import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {HostListener} from '@angular/core';


//Servicio
import {ClienteService} from '../../services/cliente.service';

//Modelo
import {Cliente} from '../../../assets/models/cliente';


//Validacion de formularios
import { FormGroup, FormControl, Validators } from '@angular/forms';

//toastr
import { ToastrService } from 'ngx-toastr'; 

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  //Formulario de clientes
  clienteForm = new FormGroup({ 
      dui: new FormControl(''),
      nombre: new FormControl(''),
      mascota: new FormControl('') 

  });
  
  constructor(public clienteServicio:ClienteService,) { }

  ngOnInit(): void {
  }

  onSubmit(clienteForm:NgForm){

    this.clienteServicio.crearClienteOrCrearVisita(clienteForm.value);
    clienteForm.reset();
  }
  
  actualizar(){ 
    this.clienteServicio.actualizarCliente(); 
    this.clienteServicio.cancelarSeleccion();
    
  }
  eliminar(){ 

    this.clienteServicio.eliminarCliente();  
  }

  //Detectar la tecla ESC para cancelar seleccion actual
  
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {   
    if (event.key === 'Escape') {
      this.clienteServicio.cancelarSeleccion();
      
    }  
    
  }


  
}
