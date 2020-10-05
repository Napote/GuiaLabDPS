import { Injectable, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';

//pdfmake
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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

  //Libreria para crear los pdf
  pdfmake;
  
  datosFirebase:AngularFireList<any>;
  datosCliente: Observable<Cliente[]> ;

  /*Se guardan los medicamentos que se lleva el cliente */
  medicamentosTiket: Medicamentos[] = [];
  estaConsulta:Visitas = new Visitas();
  clienteVisita:Cliente = new Cliente();

  constructor(private firebase:AngularFireDatabase) { }

  ngOnInit(): void {        
  }
 
  generatePdf(){
    const documentDefinition = { content: "Prueba de pdf" };
    pdfMake.createPdf(documentDefinition).open();
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
  recibirCosto(costo:number, descuento:number, crudo:number){
    this.estaConsulta.descuento=descuento*crudo;
    
    this.estaConsulta.crudo=crudo;
    this.estaConsulta.costo=costo;
    if (Object.keys(this.medicamentosTiket).length===0)
      this.estaConsulta.listamedicamentos='---'
    else{
      this.estaConsulta.medicamentos=[];
      this.estaConsulta.listamedicamentos=' ';
      this.medicamentosTiket.forEach(elem=>{ 
        this.estaConsulta.medicamentos.push(elem);
        this.estaConsulta.listamedicamentos += ' [' + elem.nombre + ']';
        })   
      Object.keys(this.medicamentosTiket).forEach(key=> delete this.medicamentosTiket[key]);
    }  
    
  }

  //Añade una visita y actualiza el numero de las recibidas
  crearVisita(id,cliente){     
    this.firebase.object('clientes/'+id).update({ numerovisitas: cliente.numerovisitas});  
    return this.firebase.database.ref('clientes/'+id).child('visitas').push(this.estaConsulta);  
  }
  
  //Recupera la lista de clientes
  obtenerClientes(){      
    return this.datosFirebase = this.firebase.list('clientes');
  } 
  
  
}

 


