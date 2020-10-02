import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {HostListener} from '@angular/core';
//Componentes para mostrar modal
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import{ VisitasmodalComponent } from '../visitasmodal/visitasmodal.component';

//Servicio
import {ClienteService} from '../../services/cliente.service';
 


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
  
  constructor(public clienteServicio:ClienteService, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

   //Si el cliente se ha recuperado de la tabla agrega una nueva visita
    //De lo contrario añade el cliente a la bd
  onSubmit(clienteForm:NgForm){
    if(this.clienteServicio.abiertoEdicion){ 
      this.abrirModal(clienteForm.value);
    }else{ 
      let cliente= this.clienteServicio.clienteSeleccionado;
      this.clienteServicio.crearCliente(cliente); 
    }  
  }
   
 abrirModal(cliente){ 
    const modalRef =this.modalService.open(VisitasmodalComponent, {size:'lg', windowClass: 'page payment-page'});
    modalRef.componentInstance.cliente=cliente; 
 }

  //actualiza la informacion del cliente
  actualizar(){ 
    this.clienteServicio.actualizarCliente(); 
    this.clienteServicio.cancelarSeleccion();    
  }


  //Envia el cliente para su eliminacion
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
