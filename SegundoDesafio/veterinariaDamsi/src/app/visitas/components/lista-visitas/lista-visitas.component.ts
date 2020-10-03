import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
  
  
import { Observable } from 'rxjs';
//Service
import { VisitasService } from '../../../services/visitas.service';
//Model
import { Cliente } from '../../../models/cliente';
import { InterpolationConfig } from '@angular/compiler';

@Component({
  selector: 'app-lista-visitas',
  templateUrl: './lista-visitas.component.html',
  styleUrls: ['./lista-visitas.component.css']
})
export class ListaVisitasComponent implements OnInit {
  id: any;   
  //cliente:Cliente = new Cliente();
  clc:Cliente[];

  constructor(private _Activatedroute:ActivatedRoute,
              public visitasServicio:VisitasService) { }
  
   
  /*ngOnInit(){
      this.id=this._Activatedroute.snapshot.paramMap.get("id"); 
      return this.visitasServicio.obtenerClientes().snapshotChanges().subscribe(item => { 
        item.forEach(element => {          
          //let x = new Cliente();
          let x = element.payload.toJSON();
          if(element.key == this.id){
            x["id"]= element.key; 
            console.log(x);
            this.cliente = x as Cliente;          
          }           
        });
      });  */
 

      ngOnInit(){
        this.id=this._Activatedroute.snapshot.paramMap.get("id"); 
        return this.visitasServicio.obtenerClientes().snapshotChanges().subscribe(item => { 
          this.clc = [];
          item.forEach(element => {            
            let x = element.payload.toJSON();
            if(element.key == this.id){
              x["id"]= element.key;               
              this.clc.push(x as Cliente);    
              console.log(this.clc);   
            }    
          });
        });     
      

  } 


  
 
 
 
}


