import { Injectable } from '@angular/core';
//Firebase
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { Alumno } from '../models/alumno';


@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  datosFirebase:AngularFireList<any>;

  selectedAlumno:Alumno = new Alumno();

  constructor(private firebase:AngularFireDatabase) { }

  //Trae todos los alumnos registrados en firebase
  //Guarfa los elementos en la variable alumnos
  obtenerAlumnos(){
    return this.datosFirebase = this.firebase.list('alumnos');
  }

  //Crea un nuevo alumno, recibiendo de parametro un objeto de tipo alumno
  agregarAlumno(alumno:Alumno){
    this.datosFirebase.push({
      name: alumno.name,
      lastname: alumno.lastname,
      age: alumno.age
    });
  }

  //Actualiza los datos de un alumno, recibiendo un objeto de tipo alumno
  actualizarAlumno(alumno:Alumno){
    //Utilizo el metodo update de firebase, enviando la llave y los datos a actualizar
    this.datosFirebase.update(alumno.id,{
      name: alumno.name,
      lastname: alumno.lastname,
      age: alumno.age
    })
  }

  eliminarAlumno(id:string){
    this.datosFirebase.remove(id);
  }

}
