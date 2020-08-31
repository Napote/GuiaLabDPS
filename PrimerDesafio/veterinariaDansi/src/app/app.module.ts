import { BrowserModule } from '@angular/platform-browser'; 

import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormularioClientesComponent } from './formulario-clientes/formulario-clientes.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'; 

@NgModule({
  declarations: [
    AppComponent,
    FormularioClientesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
