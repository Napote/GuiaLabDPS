import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Layout para despues de autentificarse
import {MainLayoutComponent} from './components/main-layout/main-layout.component';
//Layout para inicio de sesion
import {OnlyHeaderComponent} from './components/only-header/only-header.component';
 

const routes: Routes = [
  {
    path: '',
    redirectTo: '/clientes', //Posiblemente esto se deba cambiar por el login
    pathMatch: 'full'
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'clientes', 
        loadChildren: ()=> import('../clientes/clientes.module').then(mod => mod.ClientesModule)},  
      { path: 'visitas', 
        loadChildren: ()=> import('../visitas/visitas.module').then(mod => mod.VisitasModule)},  
      
     { path: 'empleados', 
        loadChildren: ()=> import('../empleados/empleados.module').then(mod => mod.EmpleadosModule)},  

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
