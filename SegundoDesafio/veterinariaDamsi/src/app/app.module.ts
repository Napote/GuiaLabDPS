import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
//Router
import { PreloadAllModules, RouterModule} from '@angular/router';  
//Modulo para layout
import {LayoutModule} from './layout/layout.module';

// Modulos de firebase
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

// Toastr, para notificaciones en angular
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, 
    //Otros modulos
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    //Router
    RouterModule.forRoot([]),    
    LayoutModule, 
    //Angular
    AngularFireModule.initializeApp(environment.firebase), 
    AngularFireDatabaseModule, 
    NgbModule  

  ],
  providers: [], 
  bootstrap: [AppComponent]
})
export class AppModule { }