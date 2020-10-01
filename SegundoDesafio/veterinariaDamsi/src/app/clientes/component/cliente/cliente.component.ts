import { Component, OnInit } from '@angular/core';
//Servicio
import {ClienteService} from '../../services/cliente.service';

//Modelo
import {Cliente} from '../../../assets/models/cliente';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  isSelectedCliente=false;
  
  constructor(private clienteServicio:ClienteService,) { }

  ngOnInit(): void {
  }

 
  helloWorld(){
    alert("asd");
  }
}
