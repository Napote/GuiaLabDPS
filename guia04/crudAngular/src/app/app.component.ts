import { Component } from '@angular/core';
import { Alumno } from './models/alumno';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crudAngular';

  /* Arreglo de tipo Alumno*/
  alumnoArray: Alumno[]=[
    {id:1,name:"Alex",lastname:"Campos",age:35},
    {id:2,name:"Marie",lastname:"Lopez",age:20},
    {id:3,name:"Juan",lastname:"Castro",age:25}
  ]

  /*Atributo selectedAlumno*/
  selectedAlumno: Alumno = {id:0, name:'',lastname:'',age:0};

  openForEdit(alumno:Alumno):void{
    this.selectedAlumno=alumno;
  }
  addOrEdit():void{
    if(this.selectedAlumno.id===0) //Se inserta un nuevo alumno
    {
      this.selectedAlumno.id=this.alumnoArray.length+1;
      this.alumnoArray.push(this.selectedAlumno);
    }
    this.selectedAlumno={id:0,name:'',lastname:'',age:0};
  }

  delete():void{
    if(confirm('Esta seguro de eliminar el Registro?')){
      //Filtra el arreglo, devolviendo todos los registros - el registro seleccionado
      this.alumnoArray=this.alumnoArray.filter(x => x != this.selectedAlumno);
      this.selectedAlumno={id:0,name:'',lastname:'',age:0};      
    }
  }

}
