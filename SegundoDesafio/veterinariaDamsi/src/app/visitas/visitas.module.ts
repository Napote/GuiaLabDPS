import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisitasRoutingModule } from './visitas-routing.module';
import { ListaVisitasComponent } from './components/lista-visitas/lista-visitas.component';


@NgModule({
  declarations: [ListaVisitasComponent],
  imports: [
    CommonModule,
    VisitasRoutingModule
  ]
})
export class VisitasModule { }
