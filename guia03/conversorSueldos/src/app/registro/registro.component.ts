import { Component, OnInit } from '@angular/core'; 
import { FormGroup} from '@angular/forms';
import {FormControl, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-registro', 
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})


export class RegistroComponent implements OnInit {
  

  readonly descuentoISSS = 0.073;
  readonly descuentoAFP = 0.051;
  readonly descuentoRenta = 0.11;


  registro=[];
  empleado:any;
  nombreEmpleado:string;
  salarioBase: number;
  valorRenta:number;
  valorISSS:number;
  valorAFP:number;
  salarioNeto: number

  contador:number;

  formIngreso: FormGroup;
  

  constructor() { }

  ngOnInit(): void {
    this.nombreEmpleado="";
    this.salarioBase=0;
    this.valorRenta=0;
    this.valorISSS=0;
    this.valorAFP=0;
    this.salarioNeto=0;
    this.contador=0;

    this.formIngreso = this.createFormGroup();

  }

  

  ingresar(){
    this.valorRenta = this.salarioBase*this.descuentoRenta;
    this.valorISSS = +(this.salarioBase*this.descuentoISSS).toFixed(2);
    this.valorAFP = this.salarioBase*this.descuentoAFP;
    this.salarioNeto = this.salarioBase-(this.valorAFP+this.valorRenta+this.valorISSS);
    this.empleado={"nombreEmpleado":this.nombreEmpleado,"salarioBase":this.salarioBase,"valorRenta":this.valorRenta,"valorAFP":this.valorAFP,"valorISSS":this.valorISSS,"salarioNeto":this.salarioNeto}; 
    this.registro.push(this.empleado);
    this.contador++;

  }

  createFormGroup(){
    return new FormGroup({
      txtNombre: new FormControl('', [Validators.required]),
      numSalarioBase: new FormControl('', [Validators.required])
    }); 
  }

  reset(){
    this.formIngreso.reset();
  }

  

}
