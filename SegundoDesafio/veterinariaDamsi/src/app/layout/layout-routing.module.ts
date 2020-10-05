import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Layout para despues de autentificarse
import {MainLayoutComponent} from './components/main-layout/main-layout.component';
//Layout para inicio de sesion
import {OnlyHeaderComponent} from './components/only-header/only-header.component';
 
//Autentificacion de angular
import { AngularFireAuthModule } from "@angular/fire/auth";

import { AuthGuard } from "../guard/auth.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',   //path: '/login'
    pathMatch: 'full'
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'clientes', 
        loadChildren: ()=> import('../clientes/clientes.module').then(mod => mod.ClientesModule),
        canActivate: [AuthGuard]},  
      { path: 'visitas', 
        loadChildren: ()=> import('../visitas/visitas.module').then(mod => mod.VisitasModule),
        canActivate: [AuthGuard]},  
      
     { path: 'productos', 
        loadChildren: ()=> import('../productos/productos.module').then(mod => mod.ProductosModule),
        canActivate: [AuthGuard]}

    ]
  },
  {
    path: '',
    component: OnlyHeaderComponent,
    children: [
      { path: 'login',
        loadChildren:()=>import('../login/login.module').then(mod =>mod.LoginModule)},
        ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
