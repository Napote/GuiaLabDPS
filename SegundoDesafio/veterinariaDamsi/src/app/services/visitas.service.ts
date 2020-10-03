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
    this.estaConsulta.medicamentos =this.medicamentosTiket;
  }

   crearVisita(id,cliente){     
    this.estaConsulta.numero=cliente.numerovisitas; 
    this.firebase.object('clientes/'+id).update({
      numerovisitas: cliente.numerovisitas,
      visitas:this.estaConsulta
    });  
  }
  getSingleItem(id: string) { 
    const itemPath =  `clientes/${id}`;
    
    this.datosFirebase = this.firebase.list(itemPath);
    return this.datosFirebase;
  }

  obtenerCliente(id){    
    let itemPath =  `clientes/${id}`; 
    return this.firebase.object(itemPath).snapshotChanges().pipe(map(res=>{
      let x = res.payload.val();
    }))
    return this.firebase.list(itemPath).valueChanges(); 
     
  }

  servicio2(id){      
    let itemPath =  `clientes/${id}`; 
    return this.datosFirebase = this.firebase.list(itemPath);
  }
  


  servicio3(id):Observable<Cliente[]>{
    let itemPath =  `clientes/${id}`; 
    return this.firebase.list(itemPath).snapshotChanges()
      .pipe(map(res=>{
        return res.map(element=>{
          let x = element.payload.toJSON();            
          x["dui"] = element.key;
          return x as Cliente;
        });
      }));
    }

  
}

 


