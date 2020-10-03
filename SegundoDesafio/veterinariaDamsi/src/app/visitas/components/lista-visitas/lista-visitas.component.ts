import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
 
  
import { Observable } from 'rxjs';
//Service
import { VisitasService } from '../../../services/visitas.service';
//Model
import { Cliente } from '../../../models/cliente';

@Component({
  selector: 'app-lista-visitas',
  templateUrl: './lista-visitas.component.html',
  styleUrls: ['./lista-visitas.component.css']
})
export class ListaVisitasComponent implements OnInit {
  id: any;   
  clc: any;

  constructor(private _Activatedroute:ActivatedRoute,
              public visitasServicio:VisitasService) { }
  
   
  ngOnInit(){
      this.id=this._Activatedroute.snapshot.paramMap.get("id"); 
      return this.visitasServicio.getSingleItem(this.id).snapshotChanges().subscribe(item=>{this.
         this.clc=response;
         console.log(response);
      }) 
  } 
 
 
}


