import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {HostListener} from '@angular/core';

//Servicio
import { ProductoService } from '../../services/producto.service';

//Validacion de formularios
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
