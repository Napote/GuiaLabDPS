import { Component, OnInit } from '@angular/core';
import {BrowserModule}from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-gas-form',
  templateUrl: './gas-form.component.html',
  styleUrls: ['./gas-form.component.css']
})
export class GasFormComponent implements OnInit{

  listaGasolina = ["Especial","Regular","Diesel"]; 
  title:string;
  gasolinaSeleccionada: string;
  numeroGalones: number;
  costoFinal: number;

  constructor() { }

  ngOnInit(): void { 
    this.title = "Gasolinera CHI FROs";
    this.gasolinaSeleccionada="Selecciona"; 
    this.numeroGalones=0.5; 
    this.costoFinal=0;
  }

  costoGalonIngresado(){
    switch(this.gasolinaSeleccionada){ 
      case'Especial':
        this.costoFinal=this.numeroGalones * 4.25; 
      break;
      case'Regular': 
        this.costoFinal=this.numeroGalones * 4.05;
      break; 
      case'Diesel':
        this.costoFinal=this.numeroGalones * 3.96; 
      break;
  }

}  

}
