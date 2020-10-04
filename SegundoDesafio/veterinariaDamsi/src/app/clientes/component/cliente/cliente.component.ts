import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {HostListener} from '@angular/core';

//Componentes para mostrar modal
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import{ VisitasmodalComponent } from '../visitasmodal/visitasmodal.component';

//Service
import { ClienteService } from '../../../services/cliente.service';
 
import Swal from 'sweetalert2';


//Validacion de formularios
import { FormGroup, FormControl, Validators } from '@angular/forms';


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
      
      Swal.fire({
        title: '¿Agregar un nuevo cliente?',
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
          this.clienteServicio.crearCliente(cliente).then(result =>{
          Swal.fire('¡Cliente Registrado!', 'Se ha registrado la información del cliente con exito', 'success')
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
            text: `Acción crear nuevo usuario cancelada`,
            icon: 'info',
            heightAuto:true,
            timer: 2000,
            timerProgressBar: true
        });
        }
        });
       
    }  
  }
   
 abrirModal(cliente){ 
    const modalRef =this.modalService.open(VisitasmodalComponent, {size:<any>'lg', windowClass: 'payment-page'});
    modalRef.componentInstance.cliente=cliente; 
    modalRef.componentInstance.id=this.clienteServicio.clienteSeleccionado.id;
 }

  //actualiza la informacion del cliente
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
    this.clienteServicio.actualizarCliente().then(result =>{
      Swal.fire('¡Información actualizada!', 'Los datos se han actualizado con exito', 'success');
    });

    this.clienteServicio.cancelarSeleccion(); 
       
  }


  //Envia el cliente para su eliminacion
  eliminar(){ 
    Swal.fire({
      title: '¿Está seguro que desea eliminar el cliente seleccionado?',
      text: `¡Esta acción no se puede deshacer!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#606ED7',
      confirmButtonText: 'Sí, eliminar'
    }).then(result => {
      if(result.value){
        this.clienteServicio.eliminarCliente(); 
        Swal.fire('¡Cliente Elimiando!', 'El cliente se ha eliminado con exito', 'success');
      }
    }) 
  }

  redireccionarHaciaVisitas(){
    alert("Hola mundo");
  }
 
  //Detectar la tecla ESC para cancelar seleccion actual
  
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {   
    if (event.key === 'Escape') {
      this.clienteServicio.cancelarSeleccion();
      
    }  
    
  }


  
}
