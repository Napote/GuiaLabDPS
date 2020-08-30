import { Component, OnInit } from '@angular/core';
import {Informacion} from '../informacion';
import {FormsModule,FormGroup, FormBuilder} from '@angular/forms';
import {BrowserModule}from '@angular/platform-browser';  


@Component({
  selector: 'app-formulario-clientes',
  templateUrl: './formulario-clientes.component.html',
  styleUrls: ['./formulario-clientes.component.css']
})
export class FormularioClientesComponent implements OnInit {
  
  datos = new Informacion(); 
  dui:string;
  nombre:string;
  mascota:string;  

  medicamentosChecklist: FormGroup;

  /*Variables para ordenes*/
  medicamentos:string;
  tratamiento:string;
  costo:number;
  
  duiClienteSeleccionado:string;
  clientesDatos=[];
  clienteSeleccionado=[];

  /*Arreglo de medicamentos para checkbox de visita*/
  listaMedicamentos = [
    { id: 1, name: 'Bravecto 1000mg', precio:34.99},
    { id: 2, name: 'Collar ECTHOL razas pequeñas',precio:14.50 },
    { id: 3, name: 'Gel antiplaca',precio:11.00 },
    { id: 4, name: 'NexGard Desparasitante',precio:15.99 },
    { id: 5, name: 'Total Full Desparasitante',precio:14.85 }
  ];

  constructor(private formBuilder: FormBuilder) {
      orden: [] 
  }

  ngOnInit(): void {
    this.dui = "";
    this.nombre = "";
    this.mascota = "";
    this.medicamentos = "";
    this.tratamiento = "";
    this.costo = 0;

    this.datos.guardarCliente('12345678-9','Nathaly Palencia','Jamoncito');
    this.datos.guardarCliente('00000000-6','Gerardo Moreno','Chispa');
    this.datos.guardarCliente('00000000-8','Andrea Mamorra','Lucas');
    this.clientesDatos = this.datos.consultarUsuarios();

  }

  guardar(){
    this.datos.guardarCliente(this.dui, this.nombre, this.mascota);
    //this.datos.guardarConsulta(this.dui, this.nombre, this.mascota, 89);
    this.clientesDatos = this.datos.consultarUsuarios();
  }

    prepararModal(clienteSeleccionado){
     this.clienteSeleccionado=Object.keys(clienteSeleccionado).map(function(key){
      return [clienteSeleccionado[key]];
     });
     console.log(this.clienteSeleccionado);
     
    } 
 
 
  }
