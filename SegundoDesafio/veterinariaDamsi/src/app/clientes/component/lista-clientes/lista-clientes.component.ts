import { Component, OnInit } from '@angular/core';

//Service
import { ClienteService } from '../../services/cliente.service';

//Model
import { Cliente } from '../../../assets/models/cliente';

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
        x["dui"] = element.key;
        this.clienteArray.push(x as Cliente);
      });
    }); 
  }

  //Funcion para editar, 
  //por el momento solo asigna el objeto como el cliente que se ha abierto para editar

  editar(cliente:Cliente){
    this.clienteServicio.clienteSeleccionado= Object.assign({},cliente);
  }




}
