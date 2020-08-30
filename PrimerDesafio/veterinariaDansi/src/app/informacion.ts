export class Informacion {

    clientes = new Array();
    consultas = new Array();
    
    nombreCliente:string;
    nombreMascota:string;
    dui:string;

    medicamentos:string;
    tratamiento:string;
    costo:number;

    constructor(){
        this.clientes = [];
        this.consultas = [];
    }

    guardarCliente(duiC:string, nombreC:string, mascotaC:string){

        this.clientes[duiC] = [duiC, nombreC, mascotaC]
        //this.consultas = [duiC];
        console.log(this.clientes)
        
    }

    guardarConsulta(dui:string, medicamentos:string, tratamiento:string, costo:number){
        let nuevaconsulta = new Array();
        nuevaconsulta = [medicamentos, tratamiento, costo];
        this.consultas[dui];
        this.consultas[dui].push(nuevaconsulta);
        console.log(this.numConsultas(dui));
        console.log(this.consultas);
        console.log(this.consultas[dui]);

    }

    consultarUsuarios(){
        return this.clientes;
    }
    
    numConsultas(duiBuscar:string){
        let num:number;
        num = this.consultas[duiBuscar].length;
        return num;
    }

}