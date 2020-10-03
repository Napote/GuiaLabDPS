import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ListaVisitasComponent} from './components/lista-visitas/lista-visitas.component';
const routes: Routes = [
  //{path:':id/:cliente', component:ListaVisitasComponent}
  {path:':id', component:ListaVisitasComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitasRoutingModule { }