import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ValidadorMaxMinService } from './validador-max-min.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';

import { ReactiveFormsModule} from 
'@angular/forms';
import { RegistroComponent } from './registro/registro.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, FormsModule,ReactiveFormsModule
  ],
  providers: [ValidadorMaxMinService],
  bootstrap: [AppComponent]
})
export class AppModule { }
