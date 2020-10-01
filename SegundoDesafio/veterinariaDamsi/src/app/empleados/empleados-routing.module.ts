import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import {ListaEmpleadosComponent} from './components/lista-empleados/lista-empleados.component';

const routes: Routes = [
  { path: '', component: ListaEmpleadosComponent }
];
 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadosRoutingModule { }
