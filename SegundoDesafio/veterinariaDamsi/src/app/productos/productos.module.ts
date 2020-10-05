import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductoRoutingModule } from './producto-routing.module'; 
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { PrincipalComponent } from './principal/principal.component';
import { ProductoComponent } from './producto/producto.component';



@NgModule({
  declarations: [ListaProductosComponent, PrincipalComponent, ProductoComponent],
  imports: [
    CommonModule,
    ProductoRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductosModule { }
