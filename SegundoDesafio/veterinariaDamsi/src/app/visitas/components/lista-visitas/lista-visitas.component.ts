import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 

//Service
import { VisitasService } from '../../../services/visitas.service';
import {ImpresionService } from '../../../services/impresion.service';
//Model
import { Cliente } from '../../../models/cliente';  

@Component({
  selector: 'app-lista-visitas',
  templateUrl: './lista-visitas.component.html',
  styleUrls: ['./lista-visitas.component.css']
})
export class ListaVisitasComponent implements OnInit {
  id: any;   
  cliente:Cliente = new Cliente();  
  elements: any ;  
  constructor(private _Activatedroute:ActivatedRoute,
              public visitasServicio:VisitasService,
              public impresionServicio:ImpresionService) { }  
   
    ngOnInit(){
      this.id=this._Activatedroute.snapshot.paramMap.get("id"); 
      return this.visitasServicio.obtenerClientes().snapshotChanges().subscribe(item => { 
        item.forEach(element => {        
          let x = element.payload.toJSON();
          if(element.key == this.id){
            x["id"]= element.key; 
            this.cliente = x as Cliente;  
            this.elements = Object.keys(this.cliente.visitas);   
            console.log(this.cliente); 
          }           
        });
      });   
    }
    
    exportar(id){ 
      this.impresionServicio.cliente = this.cliente;
      this.impresionServicio.idvisita = id;
      this.impresionServicio.generatePdf();
    }
}

 

