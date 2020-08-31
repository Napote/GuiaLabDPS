import { Component, OnInit  } from '@angular/core';
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
    { id: 1, name: 'Bravecto 1000 mg', precio:34.99,checked:false },
    { id: 2, name: 'Collar ECTHOL razas pequeñas',precio:14.50,checked:false },
    { id: 3, name: 'Gel antiplaca', precio:11.00,checked:false },
    { id: 4, name: 'NexGard Desparasitante',precio:15.99,checked:false },
    { id: 5, name: 'Total Full Desparasitante',precio:14.85,checked:false }
  ];

  /*Construyendo un formBuilder para controlar los checkbox*/
  constructor(private fb: FormBuilder) { 
    this.medicamentosChecklist=this.fb.group({
      checkArray:this.fb.array([])
    })
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
    this.clientesDatos = this.datos.consultarUsuarios();
  }

  registrarVisita(dui,mascota){
    const checkArray: FormArray = this.medicamentosChecklist.get('checkArray') as FormArray;     
    this.medicamentos=checkArray.value;
    console.log(this.medicamentos); 
    console.log(dui);
    console.log(mascota);
    console.log(this.costo);
    this.datos.guardarConsulta(dui, this.medicamentos, mascota, this.costo);
    this.clientesDatos = this.datos.consultarUsuarios();
    this.tratamiento="";
  }
  
  prepararModal(clienteSeleccionado, estaConsulta){       
     this.resetearCheckBox();
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
    const checkArray: FormArray = this.medicamentosChecklist.get('checkArray') as FormArray;
    if (values.target.checked) {
      checkArray.push(new FormControl(values.target.value));
      this.costoCrudo=this.costoCrudo+precio;
    } else {
      this.costoCrudo=this.costoCrudo-precio;
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == values.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    } 

    this.costoCrudo=+(this.costoCrudo).toFixed(2); 
    this.costo= +(this.costoCrudo-(this.descuento*this.costoCrudo)).toFixed(2);
    console.log(this.medicamentosChecklist.value)
  }

  resetearCostos(){    
    this.costoCrudo=5; 
    this.costo= +(this.costoCrudo-(this.descuento*this.costoCrudo)).toFixed(2);
  } 
 

  resetearCheckBox(){ 
      this.listaMedicamentos.forEach((item) => {
      item.checked = false;
      const checkArray: FormArray = this.medicamentosChecklist.get('checkArray') as FormArray;
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {         
          checkArray.removeAt(i); 
        i++;
      });
    } )
     
    
  
  } 
   
  }
