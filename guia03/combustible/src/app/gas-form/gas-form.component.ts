import { Component, OnInit } from '@angular/core';
 

@Component({
  selector: 'app-gas-form',
  templateUrl: './gas-form.component.html',
  styleUrls: ['./gas-form.component.css']
})
export class GasFormComponent implements OnInit {
  listaGasolina = [
    {tipo: "Especial", precio: 4.25},
    {tipo: "Regular", precio: 4.05},
    {tipo: "Diesel", precio:3.96},     
  ]; 

  gasolinaSeleccionada: string;
  numeroGalones: number;

  constructor() { }

  ngOnInit(): void {
    this.gasolinaSeleccionada="Especial";
    this.numeroGalones=1;
  }

}
