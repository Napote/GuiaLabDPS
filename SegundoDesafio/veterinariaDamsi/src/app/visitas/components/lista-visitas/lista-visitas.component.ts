import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 

//Service
import { VisitasService } from '../../../services/visitas.service';
//Model
import { Cliente } from '../../../models/cliente';  
import {Medicamentos} from '../../../models/medicamentos';
import {Visitas} from '../../../models/visitas';

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
              public visitasServicio:VisitasService) { }
  
   
    ngOnInit(){
      this.id=this._Activatedroute.snapshot.paramMap.get("id"); 
      return this.visitasServicio.obtenerClientes().snapshotChanges().subscribe(item => { 
        item.forEach(element => {        
          let x = element.payload.toJSON();
          if(element.key == this.id){
            x["id"]= element.key; 
            this.cliente = x as Cliente; 
            console.log(x);
            this.elements = Object.keys(this.cliente.visitas);    
          }           
        });
      });   
    }   
}

 

