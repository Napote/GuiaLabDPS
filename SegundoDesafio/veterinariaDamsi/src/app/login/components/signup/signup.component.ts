import { Component, OnInit } from '@angular/core';
//Service
import { AuthService } from "../../../services/auth.service";
//Forms
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms'; 
import Swal from 'sweetalert2';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit { 
 
  nuevousuariocorreo:string;
  nuevousuariopwd:string;

  /* Formulario de inicio de sesion*/
  signupForm: FormGroup;
 
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.signupForm = this.createloginFormGroup();
  }

  createloginFormGroup(){
    return new FormGroup({
      nusuario: new FormControl('', [Validators.required]),
      npwd: new FormControl('', [Validators.required])      
    }); 
  }

  signup(){ 
     if(this.signupForm.valid){
        this.authService.SignUp(this.nuevousuariocorreo, this.nuevousuariopwd); 
        this.resetFields();
     }
    else
      window.alert("Ops No")
  }

  resetFields(){
    this.signupForm.reset();
  }

}
