import { Injectable, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';

 
//Firebase
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { merge } from 'rxjs';

//Modelos
import { Cliente } from '../models/cliente';
import { Medicamentos } from '../models/medicamentos';
import { Visitas} from '../models/visitas';

@Injectable({
  providedIn: 'root'
})

export class VisitasService {
  
  datosFirebase:AngularFireList<any>;

  /*Se guardan los medicamentos que se lleva el cliente */
  medicamentosTiket: Medicamentos[] = [];
  estaConsulta:Visitas = new Visitas();
  clienteVisita:Cliente = new Cliente();

  constructor(private firebase:AngularFireDatabase) { }

  ngOnInit(): void {       
  }

  /*Se guardan los datos del cliente */ 

  quitarMedicamento(medicamento: Medicamentos): void {
    this.medicamentosTiket = this.medicamentosTiket.filter(({ id }) => id !== medicamento.id);        
  }  

  //Recibe el tratamiento del modal
  recibirTratamiento(tratamiento:string){
    this.estaConsulta.tratamiento=tratamiento;

  }

  //Recibe el costo de la consutla y asigna los medicamentos del ticket
  recibirCosto(costo:number){
    this.estaConsulta.costo=costo;
    this.estaConsulta.medicamentos =this.medicamentosTiket;
  }

   crearVisita(id,cliente){     
    this.estaConsulta.numero=cliente.numerovisitas; 
    this.firebase.object('clientes/'+id).update({
      numerovisitas: cliente.numerovisitas,
      visitas:this.estaConsulta
    });  
  }



}

