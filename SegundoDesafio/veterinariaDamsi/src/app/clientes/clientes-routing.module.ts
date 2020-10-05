import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {PrincipalComponent} from './component/principal/principal.component';

import { AuthGuard} from '../guard/auth.guard';
const routes: Routes = [
  { path: '', component: PrincipalComponent, canActivateChild: [AuthGuard] }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
