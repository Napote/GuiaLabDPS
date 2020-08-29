import { Component, OnInit } from '@angular/core';
import {BrowserModule}from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-gas-form',
  templateUrl: './gas-form.component.html',
  styleUrls: ['./gas-form.component.css']
})
export class GasFormComponent implements OnInit{

  title:string;
  listaGasolina = ["Diesel", "Regular", "Especial"];
  tipoGasolina:string;
  cantidad:number;
  totalPagar:number;

  constructor() { }

  ngOnInit(): void {
    this.title = "Gasolinera CHI FROS";    
    this.tipoGasolina = "Ninguno";
    this.cantidad = 0.05;
    this.totalPagar = 0;
  }

  calcularCostoTotal(){
    switch(this.tipoGasolina){
      case "Diesel":
        this.totalPagar = this.cantidad*3.96;
      break;
      case "Regular":
        this.totalPagar = this.cantidad*4.05;
      break;
      case "Especial":
        this.totalPagar = this.cantidad*4.25;
      break;

    }

    this.totalPagar=+(this.totalPagar).toFixed(2);
  }

}
