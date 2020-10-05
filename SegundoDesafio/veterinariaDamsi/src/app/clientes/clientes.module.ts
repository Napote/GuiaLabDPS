import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {  NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//Service
import { ClienteService } from '../services/cliente.service';

import { ClientesRoutingModule } from './clientes-routing.module'; 
import { ListaClientesComponent } from './component/lista-clientes/lista-clientes.component';
import { ClienteComponent } from './component/cliente/cliente.component';
import { PrincipalComponent } from './component/principal/principal.component';
import { VisitasmodalComponent } from './component/visitasmodal/visitasmodal.component';
import { ClientePipe } from '../pipes/cliente.pipe';


@NgModule({
  declarations: [ ListaClientesComponent, ClienteComponent, PrincipalComponent, VisitasmodalComponent, ClientePipe],
  providers:[
    ClienteService
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class ClientesModule { }
