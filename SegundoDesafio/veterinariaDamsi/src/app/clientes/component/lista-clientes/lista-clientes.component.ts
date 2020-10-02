import { Component, OnInit } from '@angular/core';


//Service
import { ClienteService } from '../../../services/cliente.service';

//Model
import { Cliente } from '../../../models/cliente';

//toastr
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit {

  constructor(
    private clienteServicio:ClienteService,
    
    private toastr:ToastrService
  ) { }

  //Array para almacenar los clientes que se van a mostrar en la base de datos
  clienteArray:Cliente[];

  ngOnInit(){
    return this.clienteServicio.obtenerClientes().snapshotChanges().subscribe(item => {
      this.clienteArray = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["id"] = element.key;
        this.clienteArray.push(x as Cliente);
      });
    }); 
  }

  //Funcion para editar 
  //Cuando se da click se asigna como clienteSeleccionado al cliente de la fila a la que se le ha dado click
  //La propiedad abiertoEdicion se vuelve verdadera, ya que se ha dado click a un cliente
  editar(cliente){ 
     this.clienteServicio.abiertoEdicion=true;     
     this.clienteServicio.clienteSeleccionado = Object.assign({},cliente); 
  }

    navegar(){ 
      console.log("Navegando");
    }
 
  

}
