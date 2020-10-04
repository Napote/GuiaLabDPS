import { Injectable, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';

 
//Firebase
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
 
//Modelos
import { Cliente } from '../models/cliente';
import { Medicamentos } from '../models/medicamentos';
import { Visitas} from '../models/visitas';


@Injectable({
  providedIn: 'root'
})

export class VisitasService {
  
  datosFirebase:AngularFireList<any>;

  datosCliente: Observable<Cliente[]> ;

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
    if (Object.keys(this.medicamentosTiket).length===0)
      this.estaConsulta.listamedicamentos='---'
    else{
      this.estaConsulta.listamedicamentos=' ';
      this.medicamentosTiket.forEach(elem=>{
        this.estaConsulta.listamedicamentos += ' [' + elem.nombre + ']';
      }) 
      Object.keys(this.medicamentosTiket).forEach(key=> delete this.medicamentosTiket[key]);
      
    }
      

    this.estaConsulta.medicamentos =this.medicamentosTiket;
  }
 

    
  //Añade una visita y actualiza el numero de las recibidas
  crearVisita(id,cliente){     
    this.estaConsulta.id=cliente.numerovisitas; 
    this.firebase.object('clientes/'+id).update({ numerovisitas: cliente.numerovisitas});  
    return this.firebase.database.ref('clientes/'+id).child('visitas').push(this.estaConsulta);  
  }
  
  obtenerClientes( ){      
    return this.datosFirebase = this.firebase.list('clientes');
  } 
  
}

 


