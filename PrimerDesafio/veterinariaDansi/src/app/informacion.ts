import { element } from 'protractor';

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
        console.log(this.clientes);
        this.clientes[duiC] = [duiC, nombreC, mascotaC]
        //this.consultas[duiC];
        console.log(this.clientes);
        console.log(this.clientes[duiC].includes(duiC));
        //console.log(this.consultas[duiC]);
        
    }

    guardarConsulta(dui:string, medicamentos:string, tratamiento:string, costo:number){

        console.log('array al instanciar metodo');
        console.log(this.consultas);
        let nuevaconsulta= new Array();
        if (this.consultas[dui]){
            nuevaconsulta = [dui, medicamentos, tratamiento, costo];
            this.consultas[dui].push(nuevaconsulta);
            console.log("se agrego otra consulta");
            console.log(this.consultas);
        }
        else{
            nuevaconsulta = [dui, medicamentos, tratamiento, costo];
            this.consultas[dui] = [];
            this.consultas[dui].push(nuevaconsulta);
            console.log("se agrego la primer consulta");
            console.log(this.consultas);

        }

        

    }

    consultarUsuarios(){
        let cliObjeto = [];
        let cliLLave:any;
        for (let llave in this.clientes){
            cliLLave = {"dui":llave, "nombre":this.clientes[llave][1], "mascota":this.clientes[llave][2], "numConsultas":this.numConsultas(llave)};
            cliObjeto.push(cliLLave);
        }
        return cliObjeto;
    
    }
    
    numConsultas(duiBuscar:string){
        let num:number;

        if (this.consultas[duiBuscar]){
            num = this.consultas[duiBuscar].length;
        }
        else{
            num = 0;
        }
        console.log('numero consultas: '+ num);
        return num;
    }

}