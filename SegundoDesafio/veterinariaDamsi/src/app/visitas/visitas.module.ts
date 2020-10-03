import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisitasRoutingModule } from './visitas-routing.module';
import { ListaVisitasComponent } from './components/lista-visitas/lista-visitas.component';
//Service
import { VisitasService } from '../services/visitas.service';


@NgModule({
  declarations: [ListaVisitasComponent],
  providers:[VisitasService],
  imports: [
    CommonModule,
    VisitasRoutingModule
  ]
})
export class VisitasModule { }
