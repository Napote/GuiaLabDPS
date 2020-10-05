import { Component, OnInit } from '@angular/core';
//Service
import { AuthService } from "../../../services/auth.service";
//Forms
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms'; 
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuariocorreo:string;
  usuariopwd:string;

  /* Formulario de inicio de sesion*/
  loginForm: FormGroup;
 
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.createloginFormGroup();
  }

  createloginFormGroup(){
    return new FormGroup({
      usuario: new FormControl('', [Validators.required]),
      pwd: new FormControl('', [Validators.required]),
      loginbtn: new FormControl('')
    }); 
  }

  login(){ 
     if(this.loginForm.valid)
      this.authService.SignIn(this.usuariocorreo, this.usuariopwd); 
    else
      window.alert("Ops")
  }



  
 

}
