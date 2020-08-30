export class Informacion {

    clientes = new Array();
    nombreCliente:string;
    nombreMascota:string;
    dui:string;

    medicamentos:string;
    tratamiento:string;
    costo:number;

    constructor(){
    }

    guardarCliente(duiC:string, nombreC:string, mascotaC:string){

        this.clientes[duiC] = [duiC, nombreC, mascotaC]
        console.log(this.clientes)
        
    }

    guardarConsulta(medicamentos:string, tratamiento:string, costo:number){

    }
    

}