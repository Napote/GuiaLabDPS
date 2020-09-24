import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

// Firebase services + environments module
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth"; 
import { AngularFirestoreModule } from '@angular/fire/firestore'; 
import { environment } from '../environments/environment';

//Routing
import { AppRoutingModule } from './app-routing.module';

//Componentesw
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

//Servicio de autentificacion
import {AuthService} from './services/auth.service';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { AlumnoComponent } from './components/alumnos/alumno/alumno.component';
import { AlumnoListComponent } from './components/alumnos/alumno-list/alumno-list.component';

//Toastr, para notificaciones en angular
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    AlumnosComponent,
    AlumnoComponent,
    AlumnoListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //Angular modulos
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule, FormsModule, ToastrModule.forRoot(), BrowserAnimationsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
