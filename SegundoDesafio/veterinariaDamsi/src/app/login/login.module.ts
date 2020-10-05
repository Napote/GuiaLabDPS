import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './components/login/login.component';
//Reactive Forms 
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { SignupComponent } from './components/signup/signup.component'; 


@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class LoginModule { }
