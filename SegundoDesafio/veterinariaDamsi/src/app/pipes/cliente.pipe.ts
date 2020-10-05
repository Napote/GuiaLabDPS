import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cliente'
})
export class ClientePipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg === '') return value;
    const resultClientes = [];
     for(const cliente of value){
       if(cliente.dui.toLowerCase().indexOf(arg.toLowerCase()) > -1){
         resultClientes.push(cliente);
       }
       else if(cliente.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultClientes.push(cliente);
      }
     }
    return resultClientes;
  }

}
