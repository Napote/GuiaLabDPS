import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {PrincipalComponent} from './principal/principal.component';

const routes: Routes = [
  //{path:':id/:cliente', component:ListaVisitasComponent}
  {path:'', component:PrincipalComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProductoRoutingModule { }