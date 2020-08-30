import { Component, OnInit } from '@angular/core';
import {Informacion} from '../informacion';
import {FormsModule} from '@angular/forms';
import {BrowserModule}from '@angular/platform-browser'

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
  medicamentos:string;
  tratamiento:string;
  costo:number;

  clientesDatos=[];

  constructor() { }

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

  agregarVisita(duiClienteSeleccionado){
    console.log(duiClienteSeleccionado);
  }





}


