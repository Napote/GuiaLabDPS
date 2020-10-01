import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module'; 
import { ListaClientesComponent } from './component/lista-clientes/lista-clientes.component';
import { ClienteComponent } from './component/cliente/cliente.component';
import { PrincipalComponent } from './component/principal/principal.component';


@NgModule({
  declarations: [ ListaClientesComponent, ClienteComponent, PrincipalComponent],
  imports: [
    CommonModule,
    ClientesRoutingModule
  ]
})
export class ClientesModule { }
