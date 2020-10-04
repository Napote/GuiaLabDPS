import { Component, OnInit } from '@angular/core';

//Service
import { ProductoService} from '../../services/producto.service';

//Model
import { Medicamentos } from '../../models/medicamentos';
import { element } from 'protractor';


@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {

  constructor(
    private productoServicio:ProductoService,
  ) { }

  productoArray:Medicamentos[];

  ngOnInit(){
    return this.productoServicio.obtenerProductos().snapshotChanges().subscribe(item=>{
      this.productoArray=[];
      item.forEach(element=>{
        let x = element.payload.toJSON();
        x["id"]=element.key;
        this.productoArray.push(x as Medicamentos);
      });
    }); 
  }

  editar(producto){ 
    this.productoServicio.abiertoEdicion=true;     
    this.productoServicio.productoSeleccionado = Object.assign({},producto); 
 }


}
