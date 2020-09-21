import { Component, OnInit } from '@angular/core';

//Service
import { AlumnoService } from '../../../services/alumno.service';

//Model
import { Alumno } from '../../../models/alumno';

//toastr
import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';

@Component({
  selector: 'app-alumno-list',
  templateUrl: './alumno-list.component.html',
  styleUrls: ['./alumno-list.component.css']
})
export class AlumnoListComponent implements OnInit {

  /*alumnoArray:Alumno[]=[
    {id:"1",name:'Alex',lastname:'Campos',age:35},
    {id:"2",name:'Maria',lastname:'Lopez',age:20},
    {id:"3",name:'Juan',lastname:'Castro',age:25}
  ];*/
  //selectedAlumno:Alumno = {id:"0",name:'',lastname:'',age:0};

  alumnoArray:Alumno[];
  
  constructor(
    private alumnoServicio:AlumnoService,
    private toastr:ToastrService
  ) { }
  ngOnInit() {
    return this.alumnoServicio.obtenerAlumnos().snapshotChanges().subscribe(item => {
      this.alumnoArray = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["id"] = element.key;
        this.alumnoArray.push(x as Alumno);
      });
    });
  }

  editar(alumno:Alumno){
    this.alumnoServicio.selectedAlumno = Object.assign({},alumno);
  }

  eliminar(id:string){
    if(confirm('¿Esta seguro de eliminar el Alumno seleccionado?')){
      this.alumnoServicio.eliminarAlumno(id);
      this.toastr.warning('Alumno eliminado exitosamente', 'Alumno eliminado');
    }
  }

}
