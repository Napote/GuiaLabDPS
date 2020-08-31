import { Component, OnInit } from '@angular/core';
import {Informacion} from '../informacion'; 
import {BrowserModule}from '@angular/platform-browser';  
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { FormsModule,FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

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

  /*Formulario de medicamentos*/
  medicamentosChecklist: FormGroup; 

  /*Variables para ordenes*/
  medicamentos:string;
  tratamiento:string;

  costoCrudo:number;
  descuento:number;
  costo:number;

  duiClienteSeleccionado:string;
  clientesDatos=[];
  clienteSeleccionado=[];
 
  listaMedicamentos = [
    { id: 1, name: 'Bravecto 1000 mg', precio:34.99},
    { id: 2, name: 'Collar ECTHOL razas pequeñas',precio:14.50 },
    { id: 3, name: 'Gel antiplaca', precio:11.00 },
    { id: 4, name: 'NexGard Desparasitante',precio:15.99 },
    { id: 5, name: 'Total Full Desparasitante',precio:14.85 }
  ];

  constructor() { 
  }

  ngOnInit(): void {
    this.dui = "";
    this.nombre = "";
    this.mascota = "";
    this.medicamentos = "";
    this.tratamiento = ""; 
    this.costoCrudo=5;
    this.descuento=0;
    this.costo=5;

    this.datos.guardarCliente('12345678-9','Nathaly Palencia','Jamoncito');
    this.datos.guardarCliente('00000000-6','Gerardo Moreno','Chispa');
    this.datos.guardarCliente('00000000-8','Andrea Mamorra','Lucas');
    this.datos.guardarCliente('00000000-9','Rosario de Mora','Soledad');

    this.datos.guardarConsulta('12345678-9', 'No aplica', 'Tenia tos el perrito', 5)
    this.datos.guardarConsulta('12345678-9', 'No aplica', 'Tenia gripe el perrito', 5)
    this.datos.guardarConsulta('12345678-9', 'No aplica', 'Tenia gripe el humano', 5)

    this.datos.guardarConsulta('00000000-6', 'No aplica', 'Tenia gripe el gatito', 5) 

    this.clientesDatos = this.datos.consultarUsuarios();

  }

  guardar(){
    this.datos.guardarCliente(this.dui, this.nombre, this.mascota);
    //this.datos.guardarConsulta(this.dui, this.nombre, this.mascota, 89);
    this.clientesDatos = this.datos.consultarUsuarios();
  }

  prepararModal(clienteSeleccionado, estaConsulta){      
     this.descuento=0;

     this.clienteSeleccionado=Object.keys(clienteSeleccionado).map(function(key){ 
      return [clienteSeleccionado[key]];
     });  

     if(estaConsulta>=2 && estaConsulta <4){
       this.descuento=0.05;
     } 
     else if(estaConsulta>=4){
      this.descuento=0.1;}

    this.resetearCostos();
    
  } 

  calcularCosto(precio:number, values:any){   
    values.target.checked? this.costoCrudo=this.costoCrudo+precio:this.costoCrudo=this.costoCrudo-precio;    
    this.costoCrudo=+(this.costoCrudo).toFixed(2); 
    this.costo= +(this.costoCrudo-(this.descuento*this.costoCrudo)).toFixed(2);
  }

  resetearCostos(){    
    this.costoCrudo=5; 
    this.costo= +(this.costoCrudo-(this.descuento*this.costoCrudo)).toFixed(2);
  }
 
 
  }
