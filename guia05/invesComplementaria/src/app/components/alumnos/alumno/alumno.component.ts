import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

//Service
import { AlumnoService } from '../../../services/alumno.service';
//Model
import { Alumno } from '../../../models/alumno';
//toastr
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit {

  /*alumnoArray:Alumno[] = [];
  selectedAlumno:Alumno = {id:0,name:'',lastname:'',age:0};*/

  constructor(
    public alumnoServicio:AlumnoService,
    public toastr:ToastrService
  ) { }

  ngOnInit() {
    this.alumnoServicio.obtenerAlumnos();
    this.resetForm();
  }

  onSubmit(alumnoForm:NgForm){
    if(alumnoForm.value.id == null){
      this.alumnoServicio.agregarAlumno(alumnoForm.value);
    }else{
      this.alumnoServicio.actualizarAlumno(alumnoForm.value);
    }
    alumnoForm.reset();
  }
  
  resetForm(alumnoForm?:NgForm){
    if(alumnoForm != null){
      alumnoForm.reset();
    }
    this.alumnoServicio.selectedAlumno = new Alumno();
  }

}
